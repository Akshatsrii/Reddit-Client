import { useEffect } from "react"
import Header from "./components/Header"
import Lane from "./components/Lane"
import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
  const [subreddits, setSubreddits] = useLocalStorage<string[]>("subreddits", [])

  // Auto add default subreddit if empty
  useEffect(() => {
    if (subreddits.length === 0) {
      setSubreddits(["javascript"])
    }
  }, [subreddits.length, setSubreddits])

  const addSubreddit = (name: string) => {
    const formatted = name.toLowerCase().trim()

    if (!formatted) return
    if (subreddits.includes(formatted)) {
      return
    }

    setSubreddits([...subreddits, formatted])
  }

  const removeSubreddit = (name: string) => {
    setSubreddits(subreddits.filter((sub) => sub !== name))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-900">
      <Header onAdd={addSubreddit} />

      {subreddits.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
              No Subreddits Yet
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Add your favorite subreddits above to start browsing multiple communities at once
            </p>
          </div>
        </div>
      )}

      {subreddits.length > 0 && (
        <main className="p-3 sm:p-4 md:p-6">
          {/* Mobile & Tablet: Vertical Stack */}
          <div className="grid grid-cols-1 lg:hidden gap-4 sm:gap-5 md:gap-6">
            {subreddits.map((sub) => (
              <Lane
                key={sub}
                subreddit={sub}
                onRemove={removeSubreddit}
              />
            ))}
          </div>

          {/* Desktop: Horizontal Scrolling Lanes */}
          <div className="hidden lg:flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
            {subreddits.map((sub) => (
              <Lane
                key={sub}
                subreddit={sub}
                onRemove={removeSubreddit}
              />
            ))}
          </div>
        </main>
      )}

      {/* Scroll indicator for desktop */}
      {subreddits.length > 2 && (
        <div className="hidden lg:block fixed bottom-6 right-6 bg-white text-gray-600 px-3 py-2 rounded-lg text-xs shadow-lg border border-gray-200">
          ← Scroll →
        </div>
      )}
    </div>
  )
}

export default App