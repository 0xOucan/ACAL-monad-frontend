import { Canoe } from "./canoe"
import { cn } from "@/lib/utils"

interface OrderStatusProps {
  status: "open" | "locked" | "completed" | "cancelled" | "expired"
  className?: string
}

export function OrderStatus({ status, className }: OrderStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "open":
        return {
          canoeState: "empty" as const,
          label: "Esperando",
          color: "text-[var(--acal-turquoise)]",
          bgColor: "bg-[var(--acal-turquoise)]/10",
        }
      case "locked":
        return {
          canoeState: "passenger" as const,
          label: "En proceso",
          color: "text-[var(--acal-navy)]",
          bgColor: "bg-[var(--acal-navy)]/10",
        }
      case "completed":
        return {
          canoeState: "golden" as const,
          label: "Completado",
          color: "text-[var(--acal-gold)]",
          bgColor: "bg-[var(--acal-gold)]/10",
        }
      case "cancelled":
        return {
          canoeState: "broken" as const,
          label: "Cancelado",
          color: "text-red-600",
          bgColor: "bg-red-100",
        }
      case "expired":
        return {
          canoeState: "sunken" as const,
          label: "Expirado",
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg", config.bgColor, className)}>
      <Canoe state={config.canoeState} size="sm" />
      <span className={cn("font-pixel text-xs", config.color)}>{config.label}</span>
    </div>
  )
}
