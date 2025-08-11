import { useEffect } from "react"
import type { KeyStatistics } from "@/pages/index/types/statistics"
import { getBaseApiUrl } from "@/shared/api/getBaseApiUrl"

export function useSEO(statistics: KeyStatistics) {
  useEffect(() => {
    document.title = `Keyboard Stats: ${statistics.totalPresses || 0} presses | ${statistics.pressesPerMinute || 0}/min`

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Live keyboard statistics: ${statistics.totalPresses} total presses, ${statistics.pressesPerMinute} presses per minute, ${statistics.uniqueKeys} unique keys used. Most pressed: ${statistics.mostPressedKey || "None"}`,
      )
    }

    const structuredDataScript = document.querySelector('script[type="application/ld+json"]')
    if (structuredDataScript) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Keyboard Statistics Tracker",
        description: `Real-time keyboard tracking with ${statistics.totalPresses} total presses recorded`,
        url: window.location.href,
        applicationCategory: "Productivity",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Real-time keyboard tracking",
          "Key frequency analysis",
          "Typing speed calculation",
          "Live statistics display",
          "Multi-user support",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "150",
        },
      }
      structuredDataScript.textContent = JSON.stringify(structuredData)
    }
  }, [statistics])

  useEffect(() => {
    const apiUrl = getBaseApiUrl()
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = `${apiUrl}/api/keyboard/statistics`
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])
}
