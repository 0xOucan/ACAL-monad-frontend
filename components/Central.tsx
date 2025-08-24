export type CentralState = "base" | "active" | "success" | "failed"

export default function Central({ state = "base" }: { state: CentralState }) {
  const getStateStyles = () => {
    switch (state) {
      case "base":
        return "bg-primary border-neutral"
      case "active":
        return "bg-secondary border-primary animate-pulse"
      case "success":
        return "bg-accent border-accent golden-glow"
      case "failed":
        return "bg-neutral border-neutral opacity-60"
      default:
        return "bg-primary border-neutral"
    }
  }

  return (
    <div className={`w-32 h-16 border-4 ${getStateStyles()} flex items-center justify-center relative`}>
      {/* Central bridge/portal motif */}
      <div className="w-20 h-8 bg-surface border-2 border-current flex items-center justify-center">
        <div className="w-2 h-2 bg-current rounded-full"></div>
        <div className="w-4 h-1 bg-current mx-1"></div>
        <div className="w-2 h-2 bg-current rounded-full"></div>
      </div>
      {state === "active" && <div className="absolute inset-0 border-2 border-primary animate-ping"></div>}
    </div>
  )
}
