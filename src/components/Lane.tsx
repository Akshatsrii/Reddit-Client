import { useEffect, useState, useCallback } from "react"
import { RefreshCw, X, TrendingUp, Clock, Award, AlertCircle } from "lucide-react"
import type { RedditPost, RedditResponse } from "../types/reddit"
import PostCard from "./PostCard"

interface Props {
  subreddit: string
  onRemove: (subreddit: string) => void
}

type SortType = "hot" | "new" | "top"

export default function Lane({ subreddit, onRemove }: Props) {
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<SortType>("hot")
  const [lastFetch, setLastFetch] = useState<number>(Date.now())

  const fetchPosts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=25`
      )

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Subreddit not found")
        } else if (res.status === 403) {
          throw new Error("Private or banned subreddit")
        } else {
          throw new Error("Failed to load posts")
        }
      }

      const data: RedditResponse = await res.json()
      setPosts(data.data.children)
      setLastFetch(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [subreddit, sort])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleRefresh = () => {
    fetchPosts(true)
  }

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort)
  }

  const handleRetry = () => {
    fetchPosts()
  }

  const timeSinceLastFetch = Math.floor((Date.now() - lastFetch) / 1000)
  const lastFetchText = timeSinceLastFetch < 60 
    ? "just now" 
    : `${Math.floor(timeSinceLastFetch / 60)}m ago`

  return (
    <div className="
      w-full lg:min-w-[380px] lg:max-w-[420px] 
      bg-white
      rounded-xl shadow-md
      flex flex-col 
      border border-gray-200
      overflow-hidden
    ">
      {/* Header - Sticky */}
      <div className="
        sticky top-0 z-10 
        bg-white/95 backdrop-blur-md
        border-b border-gray-200
        px-4 py-3
      ">
        {/* Title & Actions */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              r/{subreddit}
            </h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-1.5 rounded-lg hover:bg-gray-100 
                       transition-colors disabled:opacity-50 group"
              aria-label="Refresh posts"
            >
              <RefreshCw 
                className={`w-4 h-4 text-gray-600 group-hover:text-green-600
                          ${refreshing ? 'animate-spin' : ''}`}
              />
            </button>
          </div>

          <button
            onClick={() => onRemove(subreddit)}
            className="p-1.5 rounded-lg hover:bg-red-50 
                     text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Remove subreddit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          <SortButton
            active={sort === "hot"}
            onClick={() => handleSortChange("hot")}
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            label="Hot"
          />
          <SortButton
            active={sort === "new"}
            onClick={() => handleSortChange("new")}
            icon={<Clock className="w-3.5 h-3.5" />}
            label="New"
          />
          <SortButton
            active={sort === "top"}
            onClick={() => handleSortChange("top")}
            icon={<Award className="w-3.5 h-3.5" />}
            label="Top"
          />
        </div>

        {/* Last Updated */}
        {!loading && !error && (
          <p className="text-xs text-gray-500 mt-2">
            Updated {lastFetchText}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 
                    scrollbar-thin scrollbar-thumb-gray-300 
                    scrollbar-track-transparent">
        {/* Loading State */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-50 rounded-xl p-4 animate-pulse border border-gray-100"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center 
                        py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50
                          flex items-center justify-center mb-4 border border-red-100">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Oops!
            </h3>
            <p className="text-sm text-gray-600 mb-4 max-w-xs">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 
                       text-white rounded-lg transition-colors
                       text-sm font-medium shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center 
                        py-12 px-4 text-center">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Posts Found
            </h3>
            <p className="text-sm text-gray-600 max-w-xs">
              This subreddit doesn't have any posts yet
            </p>
          </div>
        )}

        {/* Posts */}
        {!loading && !error && posts.length > 0 && (
          <>
            {posts.map((post) => (
              <PostCard key={post.data.id} post={post} />
            ))}
          </>
        )}
      </div>

      {/* Footer - Post Count */}
      {!loading && !error && posts.length > 0 && (
        <div className="
          sticky bottom-0 
          bg-white/95 backdrop-blur-md 
          border-t border-gray-200
          px-4 py-2 
          text-center
        ">
          <p className="text-xs text-gray-500">
            Showing {posts.length} posts
          </p>
        </div>
      )}
    </div>
  )
}

// Sort Button Component
interface SortButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function SortButton({ active, onClick, icon, label }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg
        text-xs font-medium transition-all
        ${active 
          ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm' 
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}