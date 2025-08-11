export interface KeyStatistics {
  totalPresses: number
  keyFrequency: Record<string, number>
  recentPresses: Array<{ key: string; timestamp: number }>
  pressesPerMinute: number
  mostPressedKey: string
  uniqueKeys: number
}
