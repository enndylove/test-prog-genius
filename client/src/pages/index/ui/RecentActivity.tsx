import { Clock } from "lucide-react";
import { KeyStatistics } from "../types/statistics";

interface RecentActivityProps {
  statistics: KeyStatistics,
}

export function RecentActivity({ statistics }: RecentActivityProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {statistics.recentPresses.length > 0 ? (
          statistics.recentPresses.map((press, index) => (
            <div
              key={`${press.key}-${press.timestamp}-${index}`}
              className="flex items-center justify-between text-sm p-2 hover:bg-muted/30 rounded"
            >
              <span className="font-mono bg-muted px-2 py-1 rounded">{press.key}</span>
              <span className="text-muted-foreground">{formatTimestamp(press.timestamp)}</span>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  )
}
