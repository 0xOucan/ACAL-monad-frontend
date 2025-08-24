import { cn } from "@/lib/utils"

interface CanoeProps {
  state: "empty" | "passenger" | "golden" | "broken" | "sunken"
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function Canoe({ state, size = "md", className, animated = true }: CanoeProps) {
  const sizeClasses = {
    sm: "w-16 h-12",
    md: "w-24 h-18",
    lg: "w-32 h-24",
  }

  const getCanoeColor = () => {
    switch (state) {
      case "empty":
        return "fill-[var(--acal-turquoise)]"
      case "passenger":
        return "fill-[var(--acal-navy)]"
      case "golden":
        return "fill-[var(--acal-gold)]"
      case "broken":
        return "fill-red-600"
      case "sunken":
        return "fill-gray-600"
      default:
        return "fill-[var(--acal-turquoise)]"
    }
  }

  const getAnimationClass = () => {
    if (!animated) return ""

    switch (state) {
      case "empty":
        return "canoe-float"
      case "passenger":
        return "canoe-sail"
      case "golden":
        return "golden-glow treasure-sparkle"
      case "broken":
        return "error-shake"
      case "sunken":
        return ""
      default:
        return "canoe-float"
    }
  }

  return (
    <div className={cn("pixel-art fade-in-up", sizeClasses[size], getAnimationClass(), className)}>
      <svg viewBox="0 0 32 24" className="w-full h-full">
        {/* Canoe base */}
        <rect x="4" y="16" width="24" height="4" className={getCanoeColor()} />
        <rect x="2" y="18" width="2" height="2" className={getCanoeColor()} />
        <rect x="28" y="18" width="2" height="2" className={getCanoeColor()} />
        <rect x="6" y="14" width="20" height="2" className={getCanoeColor()} />

        {/* Canoe sides */}
        <rect x="4" y="12" width="2" height="4" className={getCanoeColor()} />
        <rect x="26" y="12" width="2" height="4" className={getCanoeColor()} />

        {/* Passenger (if present) */}
        {state === "passenger" && (
          <>
            <rect x="14" y="8" width="4" height="4" className="fill-[var(--acal-obsidian)]" />
            <rect x="15" y="6" width="2" height="2" className="fill-amber-600" />
          </>
        )}

        {/* Broken effect */}
        {state === "broken" && (
          <>
            <rect x="12" y="14" width="2" height="2" className="fill-transparent" />
            <rect x="18" y="16" width="2" height="2" className="fill-transparent" />
          </>
        )}

        {/* Sunken effect (partially underwater) */}
        {state === "sunken" && (
          <rect x="0" y="20" width="32" height="4" className="fill-blue-400 opacity-60 water-waves" />
        )}

        {/* Golden sparkles */}
        {state === "golden" && (
          <>
            <rect x="8" y="10" width="1" height="1" className="fill-yellow-300 aztec-pulse" />
            <rect x="22" y="8" width="1" height="1" className="fill-yellow-300 aztec-pulse" />
            <rect x="16" y="6" width="1" height="1" className="fill-yellow-300 aztec-pulse" />
          </>
        )}
      </svg>
    </div>
  )
}
