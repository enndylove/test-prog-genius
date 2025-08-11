interface CountProps {
  isAnimating: boolean,
  keyPressCount: number,
}

export function Count({
  isAnimating,
  keyPressCount,
}: CountProps) {
  return (
    <div className="text-center">
      <div
        className={`text-2xl font-bold text-primary transition-all duration-200 ${
          isAnimating ? "scale-110" : ""
        }`}
      >
        {keyPressCount}
      </div>
      <p className="text-sm text-muted-foreground">
        Keys pressed this session
      </p>
    </div>
  )
}
