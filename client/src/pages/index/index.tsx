import { useEffect, useState } from "react"
import { KeyStatistics } from "./types/statistics"
import { useWebSocket } from "@/hooks/useWebSocket"
import { getBaseApiUrl } from "@/shared/api/getBaseApiUrl"
import { useSEO } from "@/hooks/useSEO"
import { useKeyboardTracking } from "@/hooks/useKayboardTracking"
import { KeyboardTracker } from "./components/KeyboardTracker"
import { LiveTypingSpeed } from "./components/LiveTypingSpeed"
import { RealTimeChart } from "./components/RealTimeChart"
import { StatisticsDisplay } from "./components/StatisticsDisplay"
import { LiveKeyboardVisualizer } from "./components/LiveKeyboardVisualizer"

export function HomeComponent() {
  const [statistics, setStatistics] = useState<KeyStatistics>({
    totalPresses: 0,
    keyFrequency: {},
    recentPresses: [],
    pressesPerMinute: 0,
    mostPressedKey: "",
    uniqueKeys: 0,
  })

  const [lastKeyPressed, setLastKeyPressed] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const apiUrl = getBaseApiUrl()
  const { socket, isConnected } = useWebSocket(apiUrl)

  useSEO(statistics)

  useKeyboardTracking((key, timestamp) => {
    setLastKeyPressed(key)

    if (socket && isConnected) {
      socket.emit("keyPress", { key, timestamp })
    }
  })

  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/keyboard/statistics`)
        if (response.ok) {
          const initialStats = await response.json()
          setStatistics(initialStats)
        }
      } catch (error) {
        console.error("Failed to fetch initial statistics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialStats()
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on("statisticsUpdate", (newStats: KeyStatistics) => {
      setStatistics(newStats)
    })

    if (isConnected) {
      socket.emit("getStatistics")
    }

    return () => {
      socket.off("statisticsUpdate")
    }
  }, [socket, isConnected])

  const handleClearStatistics = () => {
    if (socket && isConnected) {
      socket.emit("clearStatistics")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading keyboard statistics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Keyboard Statistics Tracker</h1>
          <p className="text-muted-foreground">Real-time tracking of your keyboard usage</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
            />
            <span className="text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </header>

        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <KeyboardTracker />
            <LiveTypingSpeed recentPresses={statistics.recentPresses} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RealTimeChart statistics={statistics} />
            <StatisticsDisplay statistics={statistics} onClearStatistics={handleClearStatistics} />
          </div>

          <LiveKeyboardVisualizer lastKeyPressed={lastKeyPressed} keyFrequency={statistics.keyFrequency} />
        </div>
      </div>
    </div>
  )
}
