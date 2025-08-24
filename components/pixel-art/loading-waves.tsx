import { cn } from "@/lib/utils"

interface LoadingWavesProps {
  className?: string
}

export function LoadingWaves({ className }: LoadingWavesProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-1", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-[var(--acal-turquoise)] pixel-art animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  )
}
