export interface RedditPost {
  data: {
    // Identifiers
    id: string
    name: string // fullname like "t3_abc123"
    subreddit: string
    subreddit_name_prefixed: string // "r/javascript"
    
    // Content
    title: string
    selftext: string
    selftext_html: string | null
    url: string
    permalink: string
    
    // Author
    author: string
    author_fullname?: string
    
    // Engagement
    ups: number
    downs: number
    score: number
    upvote_ratio: number
    num_comments: number
    
    // Media & Thumbnails
    thumbnail: string // "self", "default", "nsfw", or URL
    thumbnail_width?: number
    thumbnail_height?: number
    preview?: {
      images: Array<{
        source: {
          url: string
          width: number
          height: number
        }
        resolutions: Array<{
          url: string
          width: number
          height: number
        }>
      }>
      enabled: boolean
    }
    
    // Post Type
    is_self: boolean
    is_video: boolean
    post_hint?: "image" | "link" | "self" | "video" | "rich:video"
    
    // Metadata
    created_utc: number
    edited: boolean | number
    locked: boolean
    pinned: boolean
    stickied: boolean
    archived: boolean
    over_18: boolean // NSFW
    spoiler: boolean
    
    // Flair
    link_flair_text?: string
    link_flair_background_color?: string
    link_flair_text_color?: "dark" | "light"
    
    // Domain
    domain: string
  }
}

export interface RedditResponse {
  kind: "Listing"
  data: {
    children: RedditPost[]
    after: string | null // Pagination cursor
    before: string | null
    dist: number // Number of children
    modhash: string
  }
}

// Utility types
export type PostType = "text" | "image" | "video" | "link" | "gallery"

export interface FetchOptions {
  limit?: number // 1-100, default 25
  after?: string // Pagination
  before?: string
  sort?: "hot" | "new" | "top" | "rising"
  t?: "hour" | "day" | "week" | "month" | "year" | "all" // For 'top' sort
}

// Helper function to determine post type
export function getPostType(post: RedditPost): PostType {
  const { data } = post
  
  if (data.is_video) return "video"
  if (data.post_hint === "image") return "image"
  if (data.is_self) return "text"
  if (data.url.includes("/gallery/")) return "gallery"
  return "link"
}

// Helper to get best thumbnail
export function getThumbnailUrl(post: RedditPost): string | null {
  const { data } = post
  
  // Check preview images first
  if (data.preview?.images?.[0]?.source?.url) {
    return data.preview.images[0].source.url.replace(/&amp;/g, "&")
  }
  
  // Fallback to thumbnail
  if (data.thumbnail && !["self", "default", "nsfw"].includes(data.thumbnail)) {
    return data.thumbnail
  }
  
  return null
}

// Helper for relative time
export function getRelativeTime(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  
  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`
  return `${Math.floor(seconds / 31536000)}y ago`
}

// Helper to format numbers (1.2k, 5.3M)
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}