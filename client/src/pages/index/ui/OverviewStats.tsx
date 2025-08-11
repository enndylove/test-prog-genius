import { Award, Hash, Trash2, TrendingUp } from "lucide-react";
import { KeyStatistics } from "../types/statistics";

interface OverviewStatsProps {
  onClearStatistics: () => void;
  statistics: KeyStatistics;
}

export function OverviewStats({ onClearStatistics, statistics }: OverviewStatsProps) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Statistics Overview</h2>
        <button
          onClick={onClearStatistics}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Hash className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">{statistics.totalPresses}</div>
          <p className="text-sm text-muted-foreground">Total Presses</p>
        </div>
        <div className="bg-green-500/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{statistics.pressesPerMinute}</div>
          <p className="text-sm text-muted-foreground">Per Minute</p>
        </div>
        <div className="bg-blue-500/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{statistics.mostPressedKey || "None"}</div>
          <p className="text-sm text-muted-foreground">Most Pressed</p>
        </div>
        <div className="bg-purple-500/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Hash className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{statistics.uniqueKeys}</div>
          <p className="text-sm text-muted-foreground">Unique Keys</p>
        </div>
      </div>
    </div>
  )
}
