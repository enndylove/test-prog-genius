import { useEffect, useCallback } from "react"

export function useKeyboardTracking(onKeyPress: (key: string, timestamp: number) => void) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        return
      }

      let keyName = event.key

      switch (event.key) {
        case " ":
          keyName = "Space"
          break
        case "Enter":
          keyName = "Enter"
          break
        case "Backspace":
          keyName = "Backspace"
          break
        case "Tab":
          keyName = "Tab"
          break
        case "Shift":
          keyName = "Shift"
          break
        case "Control":
          keyName = "Ctrl"
          break
        case "Alt":
          keyName = "Alt"
          break
        case "Meta":
          keyName = "Cmd"
          break
        case "Escape":
          keyName = "Esc"
          break
        case "ArrowUp":
          keyName = "↑"
          break
        case "ArrowDown":
          keyName = "↓"
          break
        case "ArrowLeft":
          keyName = "←"
          break
        case "ArrowRight":
          keyName = "→"
          break
        default:
          break
      }

      onKeyPress(keyName, Date.now())
    },
    [onKeyPress],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}
