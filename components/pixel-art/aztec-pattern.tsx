import { cn } from "@/lib/utils"

interface AztecPatternProps {
  variant?: "geometric" | "waves" | "steps"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AztecPattern({ variant = "geometric", size = "md", className }: AztecPatternProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const renderPattern = () => {
    switch (variant) {
      case "geometric":
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="6" y="2" width="4" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="4" y="4" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="10" y="4" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="2" y="6" width="2" height="4" className="fill-[var(--acal-navy)]" />
            <rect x="12" y="6" width="2" height="4" className="fill-[var(--acal-navy)]" />
            <rect x="4" y="10" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="10" y="10" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="6" y="12" width="4" height="2" className="fill-[var(--acal-turquoise)]" />
          </svg>
        )
      case "waves":
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="6" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="2" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="4" y="2" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="6" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="8" y="6" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="10" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="12" y="2" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="14" y="4" width="2" height="2" className="fill-[var(--acal-turquoise)]" />
            <rect x="0" y="10" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="2" y="12" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="4" y="14" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="6" y="12" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="8" y="10" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="10" y="12" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="12" y="14" width="2" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="14" y="12" width="2" height="2" className="fill-[var(--acal-gold)]" />
          </svg>
        )
      case "steps":
        return (
          <svg viewBox="0 0 16 16" className="w-full h-full">
            <rect x="0" y="14" width="4" height="2" className="fill-[var(--acal-navy)]" />
            <rect x="4" y="12" width="4" height="2" className="fill-[var(--acal-navy)]" />
            <rect x="8" y="10" width="4" height="2" className="fill-[var(--acal-navy)]" />
            <rect x="12" y="8" width="4" height="2" className="fill-[var(--acal-navy)]" />
            <rect x="0" y="0" width="4" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="4" y="2" width="4" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="8" y="4" width="4" height="2" className="fill-[var(--acal-gold)]" />
            <rect x="12" y="6" width="4" height="2" className="fill-[var(--acal-gold)]" />
          </svg>
        )
    }
  }

  return <div className={cn("pixel-art", sizeClasses[size], className)}>{renderPattern()}</div>
}
