import { useState, useEffect, useMemo } from "react"
import { KEYBOARD_LAYOUT } from "../types/keyboard"
import { SIZE_CLASSES } from "../types/styles"

interface LiveKeyboardVisualizerProps {
  lastKeyPressed?: string
  keyFrequency: Record<string, number>
}

export function LiveKeyboardVisualizer({ lastKeyPressed, keyFrequency }: LiveKeyboardVisualizerProps) {
  const [animatingKey, setAnimatingKey] = useState("")

  useEffect(() => {
    if (lastKeyPressed) {
      setAnimatingKey(lastKeyPressed)
      const timer = setTimeout(() => setAnimatingKey(""), 300)
      return () => clearTimeout(timer)
    }
  }, [lastKeyPressed])

  const normalizeKey = (key: string) => key.toLowerCase()
  const getPressCount = (key: string) => keyFrequency[key] || keyFrequency[normalizeKey(key)] || keyFrequency[key.toUpperCase()] || 0

  const maxCount = useMemo(() => {
    const values = Object.values(keyFrequency)
    return values.length > 0 ? Math.max(...values) : 1
  }, [keyFrequency])

  const getKeyIntensity = (key: string) => {
    const count = getPressCount(key)
    return Math.min(count / maxCount, 1)
  }

  const getKeyClassName = (key: string) => {
    const isAnimating =
      normalizeKey(animatingKey) === normalizeKey(key) ||
      animatingKey === key ||
      animatingKey === key.toUpperCase()

    const baseClasses =
      "relative border rounded text-xs font-mono transition-all duration-200 flex items-center justify-center"
    const sizeClasses = SIZE_CLASSES[key] || "h-8 min-w-8 px-1"
    const intensityClasses = getKeyIntensity(key) > 0 ? "bg-primary/20 border-primary/40" : "bg-muted/30 border-border"
    const animationClasses = isAnimating ? "scale-110 bg-primary/60 border-primary shadow-lg" : ""

    return `${baseClasses} ${sizeClasses} ${intensityClasses} ${animationClasses}`
  }

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Live Keyboard Visualizer</h3>
      <div className="space-y-2 overflow-x-auto">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key) => {
              const pressCount = getPressCount(key)
              return (
                <div
                  key={key}
                  className={getKeyClassName(key)}
                  title={`${key}: ${pressCount} presses`}
                >
                  {key}
                  {pressCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {pressCount}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-muted-foreground text-center">
        Keys light up when pressed • Intensity shows frequency • Numbers show press count
      </div>
    </div>
  )
}
