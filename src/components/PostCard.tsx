import { ExternalLink, MessageSquare, Award } from "lucide-react"
import type { RedditPost } from "../types/reddit"
import { 
  getThumbnailUrl, 
  getRelativeTime, 
  formatNumber,
  getPostType 
} from "../utils/reddit"

interface Props {
  post: RedditPost
}

export default function PostCard({ post }: Props) {
  const { data } = post
  const thumbnail = getThumbnailUrl(post)
  const postType = getPostType(post)
  const timeAgo = getRelativeTime(data.created_utc)
  const redditUrl = `https://www.reddit.com${data.permalink}`

  const handleClick = () => {
    window.open(redditUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <article 
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden 
                 hover:shadow-md hover:scale-[1.01]
                 transition-all duration-200 cursor-pointer
                 border border-gray-200 hover:border-green-300
                 group"
    >
      <div className="flex gap-3 p-3 sm:p-4">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <img 
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base leading-snug 
                         text-gray-900 group-hover:text-green-700
                         line-clamp-2 mb-2">
            {data.title}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            {data.over_18 && (
              <span className="px-2 py-0.5 bg-red-50 text-red-600 
                             text-xs rounded-full font-medium border border-red-200">
                NSFW
              </span>
            )}
            {data.spoiler && (
              <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 
                             text-xs rounded-full font-medium border border-yellow-200">
                Spoiler
              </span>
            )}
            {data.link_flair_text && (
              <span 
                className="px-2 py-0.5 text-xs rounded-full font-medium border border-gray-200"
                style={{
                  backgroundColor: data.link_flair_background_color 
                    ? `${data.link_flair_background_color}20` 
                    : '#f9fafb',
                  borderColor: data.link_flair_background_color 
                    ? `${data.link_flair_background_color}40` 
                    : '#e5e7eb',
                  color: data.link_flair_text_color === 'light' 
                    ? '#fff' 
                    : data.link_flair_background_color || '#6b7280'
                }}
              >
                {data.link_flair_text}
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
            {/* Author */}
            <span className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <span className="font-medium">u/{data.author}</span>
            </span>

            {/* Time */}
            <span className="opacity-75">{timeAgo}</span>

            {/* Upvotes */}
            <span className="flex items-center gap-1 text-orange-600 font-medium">
              <span>⬆</span>
              <span>{formatNumber(data.ups)}</span>
            </span>

            {/* Comments */}
            <span className="flex items-center gap-1 hover:text-green-600 transition-colors">
              <MessageSquare className="w-3 h-3" />
              <span>{formatNumber(data.num_comments)}</span>
            </span>

            {/* Awards */}
            {data.total_awards_received && data.total_awards_received > 0 && (
              <span className="flex items-center gap-1 text-yellow-600">
                <Award className="w-3 h-3" />
                <span>{data.total_awards_received}</span>
              </span>
            )}

            {/* External Link Indicator */}
            {!data.is_self && postType === "link" && (
              <span className="flex items-center gap-1 text-blue-600">
                <ExternalLink className="w-3 h-3" />
                <span className="truncate max-w-[100px] sm:max-w-[150px]">
                  {data.domain}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Preview Text (for self posts) */}
      {data.is_self && data.selftext && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {data.selftext}
          </p>
        </div>
      )}
    </article>
  )
}