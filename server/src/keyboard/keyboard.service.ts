import { Injectable } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { KeyPress } from "./entities/key-press.entity"

export interface KeyStatistics {
  totalPresses: number
  keyFrequency: Record<string, number>
  recentPresses: Array<{ key: string; timestamp: number }>
  pressesPerMinute: number
  mostPressedKey: string
  uniqueKeys: number
}

@Injectable()
export class KeyboardService {
  private readonly keyPressRepository: Repository<KeyPress>

  constructor(keyPressRepository: Repository<KeyPress>) {
    this.keyPressRepository = keyPressRepository
  }

  async saveKeyPress(key: string, timestamp: number): Promise<KeyPress> {
    const keyPress = this.keyPressRepository.create({
      key,
      timestamp: new Date(timestamp),
    })
    return await this.keyPressRepository.save(keyPress)
  }

  async getStatistics(): Promise<KeyStatistics> {
    const allPresses = await this.keyPressRepository.find({
      order: { timestamp: "DESC" },
    })

    const totalPresses = allPresses.length

    // Calculate key frequency
    const keyFrequency: Record<string, number> = {}
    allPresses.forEach((press) => {
      keyFrequency[press.key] = (keyFrequency[press.key] || 0) + 1
    })

    // Get recent presses (last 50)
    const recentPresses = allPresses.slice(0, 50).map((press) => ({
      key: press.key,
      timestamp: press.timestamp.getTime(),
    }))

    // Calculate presses per minute (last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recentPressesCount = allPresses.filter((press) => press.timestamp > fiveMinutesAgo).length
    const pressesPerMinute = recentPressesCount / 5

    // Find most pressed key
    const mostPressedKey = Object.entries(keyFrequency).reduce(
      (max, [key, count]) => (count > max.count ? { key, count } : max),
      { key: "", count: 0 },
    ).key

    // Count unique keys
    const uniqueKeys = Object.keys(keyFrequency).length

    return {
      totalPresses,
      keyFrequency,
      recentPresses,
      pressesPerMinute: Math.round(pressesPerMinute * 100) / 100,
      mostPressedKey,
      uniqueKeys,
    }
  }

  async getStatisticsForSSR(): Promise<KeyStatistics> {
    // This method provides initial statistics for SEO/SSR
    return await this.getStatistics()
  }

  async clearAllStatistics(): Promise<void> {
    await this.keyPressRepository.clear()
  }
}
