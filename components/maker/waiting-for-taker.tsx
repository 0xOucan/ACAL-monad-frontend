"use client"

import { useState, useEffect } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { Canoe } from "@/components/pixel-art/canoe"
import { OrderStatus } from "@/components/pixel-art/order-status"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"
import type { OrderData } from "./order-preview"

interface WaitingForTakerProps {
  orderData: OrderData
  onCancel: () => void
  onNewOrder: () => void
}

export function WaitingForTaker({ orderData, onCancel, onNewOrder }: WaitingForTakerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [mockTakerFound, setMockTakerFound] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    // Simulate finding a taker after 30 seconds for demo
    const mockTimer = setTimeout(() => {
      setMockTakerFound(true)
    }, 30000)

    return () => {
      clearInterval(timer)
      clearTimeout(mockTimer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (mockTakerFound) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <Canoe state="passenger" size="lg" />
        </div>

        <AztecBorder variant="accent">
          <div className="space-y-4">
            <div className="text-lg font-pixel text-accent">¡Taker Encontrado!</div>
            <div className="text-xs text-muted-foreground">Un taker ha tomado tu orden y está procesando el pago</div>
            <OrderStatus status="locked" />
          </div>
        </AztecBorder>

        <PixelButton pixelVariant="primary" onClick={onNewOrder} className="w-full">
          Crear Nueva Orden
        </PixelButton>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Esperando Taker</h2>
        <p className="text-xs text-muted-foreground">Tu canoa está lista para pasajeros</p>
      </div>

      {/* Animated Canoe */}
      <div className="text-center">
        <div className="relative">
          <div className="flex justify-center mb-4">
            <Canoe state="empty" size="lg" className="animate-bounce" />
          </div>
          <LoadingWaves className="justify-center" />
        </div>
      </div>

      {/* Order Status */}
      <AztecBorder variant="primary">
        <div className="space-y-4">
          <OrderStatus status="open" />

          <div className="grid grid-cols-2 gap-4 text-xs text-center">
            <div>
              <div className="font-pixel text-primary">{orderData.amount} MXN</div>
              <div className="text-muted-foreground">Monto</div>
            </div>
            <div>
              <div className="font-pixel text-accent">{formatTime(timeElapsed)}</div>
              <div className="text-muted-foreground">Tiempo activo</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-2">Hash de la orden:</div>
            <div className="font-mono text-xs text-primary break-all">{orderData.hashQR}</div>
          </div>
        </div>
      </AztecBorder>

      {/* Tips */}
      <AztecBorder variant="secondary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Consejos</div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>• Tu orden estará activa por 24 horas</div>
            <div>• Los takers pueden ver tu QR una vez que bloqueen MON</div>
            <div>• Recibirás una notificación cuando alguien tome tu orden</div>
          </div>
        </div>
      </AztecBorder>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton pixelVariant="danger" onClick={onCancel} className="flex-1">
          Cancelar Orden
        </PixelButton>
        <PixelButton pixelVariant="secondary" onClick={onNewOrder} className="flex-1">
          Nueva Orden
        </PixelButton>
      </div>
    </div>
  )
}
