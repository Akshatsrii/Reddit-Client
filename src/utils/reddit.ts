import type { RedditPost } from "../types/reddit"

export type PostType = "text" | "image" | "video" | "link" | "gallery"

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
  if (data.thumbnail && !["self", "default", "nsfw", ""].includes(data.thumbnail)) {
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