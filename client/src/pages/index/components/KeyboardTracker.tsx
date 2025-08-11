import { useState, useEffect, useCallback } from "react"
import { Activity } from "lucide-react"
import { KEY_MAP } from "../types/keyboard"

import { LastKey } from "../ui/LastKey"
import { Count } from "../ui/Count"
import { Instructions } from "../ui/Instructions"

export function KeyboardTracker() {
  const [lastKey, setLastKey] = useState("")
  const [keyPressCount, setKeyPressCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.contentEditable === "true"
    ) {
      return
    }

    const keyName = KEY_MAP[event.key] || event.key
    setLastKey(keyName)
    setKeyPressCount((prev) => prev + 1)

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity
          className={`w-5 h-5 transition-colors duration-200 ${
            isAnimating ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <h2 className="text-2xl font-semibold">Keyboard Tracker</h2>
      </div>

      <div className="space-y-4">
        {/* Last Key */}
        <LastKey
          isAnimating={isAnimating}
          lastKey={lastKey}
        />

        {/* Count */}
        <Count
          isAnimating={isAnimating}
          keyPressCount={keyPressCount}
        />

        {/* Instructions */}
        <Instructions />
      </div>
    </div>
  )
}
