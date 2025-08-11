interface LastKeyProps {
  isAnimating: boolean,
  lastKey: string | undefined,
}

export function LastKey({
  isAnimating,
  lastKey
}: LastKeyProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">
        Start typing to track your keyboard usage
      </p>
      <div
        className={`bg-primary/10 rounded-lg p-8 border-2 border-dashed border-primary/20 transition-all duration-200 ${
          isAnimating ? "scale-105 border-primary/40 bg-primary/20" : ""
        }`}
      >
        <div
          className={`text-6xl font-mono mb-2 transition-all duration-200 ${
            isAnimating ? "scale-110 text-primary" : ""
          }`}
        >
          {lastKey || "?"}
        </div>
        <p className="text-sm text-muted-foreground">Last key pressed</p>
      </div>
    </div>
  )
}
