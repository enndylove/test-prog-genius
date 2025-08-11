import type { KeyStatistics } from "../types/statistics"
import { OverviewStats } from "../ui/OverviewStats"
import { TopKeys } from "../ui/TopKeys"
import { RecentActivity } from "../ui/RecentActivity"

interface StatisticsDisplayProps {
  statistics: KeyStatistics
  onClearStatistics: () => void
}

export function StatisticsDisplay({ statistics, onClearStatistics }: StatisticsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <OverviewStats
        statistics={statistics}
        onClearStatistics={onClearStatistics}
      />

      {/* Top Keys */}
      <TopKeys
        statistics={statistics}
      />

      {/* Recent Activity */}
      <RecentActivity
        statistics={statistics}
       />
    </div>
  )
}
