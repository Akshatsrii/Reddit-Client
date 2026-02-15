import { useState, FormEvent, KeyboardEvent } from "react"
import { Plus, X, Search, TrendingUp } from "lucide-react"

interface Props {
  onAdd: (subreddit: string) => void
}

const POPULAR_SUBREDDITS = [
  "javascript",
  "reactjs",
  "webdev",
  "programming",
  "technology",
  "news",
  "worldnews",
  "todayilearned",
]

export default function Header({ onAdd }: Props) {
  const [input, setInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    
    if (!input.trim()) {
      setError("Please enter a subreddit name")
      return
    }

    const cleanInput = input.trim().replace(/^r\//, "").toLowerCase()
    
    if (!/^[a-zA-Z0-9_]{3,21}$/.test(cleanInput)) {
      setError("Invalid subreddit name")
      return
    }

    onAdd(cleanInput)
    setInput("")
    setError("")
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "Escape") {
      setInput("")
      setError("")
      setShowSuggestions(false)
    }
  }

  const handleQuickAdd = (subreddit: string) => {
    onAdd(subreddit)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setInput("")
    setError("")
  }

  const handleFocus = () => {
    setShowSuggestions(true)
    setError("")
  }

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md 
                     border-b border-gray-200 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center 
                      sm:justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br 
                          from-green-500 to-emerald-600 flex items-center justify-center 
                          shadow-md">
              <span className="text-lg sm:text-xl font-bold text-white">R</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Reddit Multi-Viewer
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Browse multiple subreddits simultaneously
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form 
            onSubmit={handleSubmit}
            className="relative flex-1 sm:flex-initial sm:min-w-[320px] lg:min-w-[400px]"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 
                            pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`
                  w-full pl-10 pr-24 py-2.5 sm:py-3
                  bg-gray-50 text-gray-900 
                  rounded-lg sm:rounded-xl
                  border-2 transition-all
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2
                  ${error 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-green-500 focus:ring-green-100'
                  }
                `}
                placeholder="Add subreddit (e.g., javascript)"
                autoComplete="off"
                spellCheck="false"
              />

              {/* Clear Button */}
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-20 flex items-center pr-2
                           text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center gap-1.5
                         px-3 sm:px-4 m-1 rounded-lg sm:rounded-xl
                         bg-green-600 hover:bg-green-700
                         text-white font-medium text-sm
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-sm"
                disabled={!input.trim()}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="absolute top-full left-0 mt-1 text-xs text-red-600">
                {error}
              </p>
            )}

            {/* Suggestions Dropdown */}
            {showSuggestions && !error && (
              <div className="absolute top-full left-0 right-0 mt-2 
                            bg-white border border-gray-200 rounded-xl 
                            shadow-xl overflow-hidden z-30">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Popular Subreddits
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {POPULAR_SUBREDDITS.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleQuickAdd(sub)}
                        className="px-3 py-2 text-left text-sm
                                 bg-gray-50 hover:bg-green-50 hover:border-green-200
                                 text-gray-700 hover:text-green-700
                                 rounded-lg transition-colors
                                 truncate border border-gray-200"
                      >
                        r/{sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Quick Tip */}
        <div className="mt-3 sm:mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="hidden sm:inline">💡 Tip:</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 text-gray-700">Enter</kbd> to add, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-300 text-gray-700">Esc</kbd> to clear</span>
        </div>
      </div>
    </header>
  )
}