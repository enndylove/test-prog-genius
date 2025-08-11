import { Controller, Get, Req, Res } from "@nestjs/common"
import type { KeyboardService } from "./keyboard.service"
import type { Request, Response } from "express"
import type { KeyStatistics } from "src/types/statistics"

@Controller("api/keyboard")
export class KeyboardController {
  constructor(private readonly keyboardService: KeyboardService) {}

  @Get("statistics")
  async getStatistics() {
    return await this.keyboardService.getStatistics()
  }

  @Get("statistics/ssr")
  async getStatisticsForSSR(@Req() req: Request, @Res() res: Response) {
    try {
      const statistics = await this.keyboardService.getStatisticsForSSR()
      const userAgent = req.get("User-Agent") || ""

      const isCrawler = /bot|crawler|spider|crawling/i.test(userAgent)

      if (isCrawler) {
        const html = this.generateSEOHTML(statistics)
        res.setHeader("Content-Type", "text/html")
        res.send(html)
      } else {
        res.json(statistics)
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" })
    }
  }

  private generateSEOHTML(statistics: KeyStatistics): string {
    const topKeys = Object.entries(statistics.keyFrequency)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)

    return this.generateSEOHTML(statistics)
  }
}
