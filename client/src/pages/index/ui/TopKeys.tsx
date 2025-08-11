import { KeyStatistics } from "../types/statistics"

interface TopKeysProps {
  statistics: KeyStatistics,
}

export function TopKeys({ statistics }: TopKeysProps) {
  const topKeys = Object.entries(statistics.keyFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Most Pressed Keys</h3>
      <div className="space-y-2">
        {topKeys.length > 0 ? (
          topKeys.map(([key, count], index) => (
            <div key={key} className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                <span className="font-mono bg-primary/10 px-2 py-1 rounded text-sm">{key}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 rounded-full h-2 w-20">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(count / Math.max(...Object.values(statistics.keyFrequency))) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">{count}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">No key presses recorded yet</p>
        )}
      </div>
    </div>
  )
}
