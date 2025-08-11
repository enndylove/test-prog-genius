import { useEffect, useState } from "react"
import type { KeyStatistics } from "../types/statistics"

interface RealTimeChartProps {
  statistics: KeyStatistics
}

interface DataPoint {
  timestamp: number
  count: number
}

export function RealTimeChart({ statistics }: RealTimeChartProps) {
  const [chartData, setChartData] = useState<DataPoint[]>([])
  const MAX_POINTS = 20

  useEffect(() => {
    const now = Date.now()
    const lastPoint = chartData[chartData.length - 1]
    const isNewMinute =
      !lastPoint || Math.floor(lastPoint.timestamp / 60000) !== Math.floor(now / 60000)

    if (isNewMinute) {
      setChartData((prev) => {
        const newData = [...prev, { timestamp: now, count: statistics.totalPresses }]
        return newData.slice(-MAX_POINTS)
      })
    }
  }, [statistics.totalPresses, chartData])

  const maxCount = Math.max(...chartData.map((d) => d.count), 1)

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Real-time Activity Chart</h3>
      <div className="h-32 flex items-end justify-center gap-1">
        {chartData.length > 0 ? (
          chartData.map((point) => (
            <div
              key={point.timestamp}
              className="bg-primary/60 rounded-t transition-all duration-500 min-w-4 flex items-end justify-center"
              style={{
                height: `${(point.count / maxCount) * 100}%`,
                minHeight: "4px",
              }}
              title={`${new Date(point.timestamp).toLocaleTimeString()}: ${point.count} total presses`}
            >
              <span className="text-xs text-primary-foreground mb-1 opacity-0 hover:opacity-100 transition-opacity">
                {point.count}
              </span>
            </div>
          ))
        ) : (
          <div className="text-muted-foreground text-center">
            Start typing to see real-time activity
          </div>
        )}
      </div>
      <div className="mt-2 text-xs text-muted-foreground text-center">
        Activity over time • Hover bars for details
      </div>
    </div>
  )
}
