import { cn } from "@/lib/utils"

interface CurrencyIconProps {
  currency: "MXN" | "MON"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CurrencyIcon({ currency, size = "md", className }: CurrencyIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("pixel-art", sizeClasses[size], className)}>
      {currency === "MXN" ? (
        <svg viewBox="0 0 16 16" className="w-full h-full">
          {/* Mexican Peso symbol */}
          <rect x="2" y="2" width="2" height="12" className="fill-[var(--acal-gold)]" />
          <rect x="4" y="2" width="6" height="2" className="fill-[var(--acal-gold)]" />
          <rect x="4" y="6" width="4" height="2" className="fill-[var(--acal-gold)]" />
          <rect x="10" y="4" width="2" height="2" className="fill-[var(--acal-gold)]" />
          <rect x="8" y="8" width="2" height="2" className="fill-[var(--acal-gold)]" />
          <rect x="0" y="5" width="6" height="1" className="fill-[var(--acal-obsidian)]" />
          <rect x="0" y="9" width="6" height="1" className="fill-[var(--acal-obsidian)]" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="w-full h-full">
          {/* Monad symbol - stylized M */}
          <rect x="2" y="2" width="2" height="12" className="fill-[var(--acal-turquoise)]" />
          <rect x="12" y="2" width="2" height="12" className="fill-[var(--acal-turquoise)]" />
          <rect x="4" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
          <rect x="10" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
          <rect x="6" y="6" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
          <rect x="8" y="6" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
          <rect x="7" y="8" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
        </svg>
      )}
    </div>
  )
}
