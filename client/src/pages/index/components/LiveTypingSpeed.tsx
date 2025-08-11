import { useState, useEffect, useRef } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface LiveTypingSpeedProps {
  recentPresses: Array<{ key: string; timestamp: number }>
}

export function LiveTypingSpeed({ recentPresses }: LiveTypingSpeedProps) {
  const [currentWPM, setCurrentWPM] = useState(0)
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")
  const previousWPMRef = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    const recentKeys = recentPresses.filter((p) => p.timestamp > oneMinuteAgo)
    const estimatedWords = recentKeys.length / 5
    const wpm = Math.round(estimatedWords)

    const prevWPM = previousWPMRef.current
    if (wpm > prevWPM) setTrend("up")
    else if (wpm < prevWPM) setTrend("down")
    else setTrend("stable")

    previousWPMRef.current = currentWPM
    setCurrentWPM(wpm)
  }, [recentPresses])

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (trend === "up") return "text-green-500"
    if (trend === "down") return "text-red-500"
    return "text-muted-foreground"
  }

  const previousWPM = previousWPMRef.current
  const change = currentWPM - previousWPM

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Live Typing Speed</h3>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`text-4xl font-bold transition-colors duration-300 ${getTrendColor()}`}>
            {currentWPM}
          </span>
          {getTrendIcon()}
        </div>
        <p className="text-sm text-muted-foreground mb-4">Words per minute (estimated)</p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-lg font-semibold">{previousWPM}</div>
            <div className="text-xs text-muted-foreground">Previous</div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="text-lg font-semibold text-primary">{currentWPM}</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-lg font-semibold">{Math.max(change, 0)}</div>
            <div className="text-xs text-muted-foreground">Change</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Based on key presses in the last 60 seconds
        </div>
      </div>
    </div>
  )
}
