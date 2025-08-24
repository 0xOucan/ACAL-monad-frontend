"use client"

import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { Canoe } from "@/components/pixel-art/canoe"
import { OrderStatus } from "@/components/pixel-art/order-status"
import { AztecPattern } from "@/components/pixel-art/aztec-pattern"
import type { MarketOrder } from "./order-marketplace"

interface TransactionCompleteProps {
  order: MarketOrder
  onNewTransaction: () => void
  onBackToHome: () => void
}

export function TransactionComplete({ order, onNewTransaction, onBackToHome }: TransactionCompleteProps) {
  const monAmount = (order.amount / Number.parseFloat(order.cr)).toFixed(4)
  const bondAmount = (Number.parseFloat(monAmount) * 0.1).toFixed(4)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2 text-accent">¡Transacción Completa!</h2>
        <p className="text-xs text-muted-foreground">Tu viaje en la canoa fue exitoso</p>
      </div>

      {/* Success Animation */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Canoe state="golden" size="lg" className="animate-pulse" />
        </div>
        <div className="flex justify-center gap-2">
          <AztecPattern variant="geometric" size="sm" />
          <AztecPattern variant="waves" size="sm" />
          <AztecPattern variant="steps" size="sm" />
        </div>
      </div>

      {/* Transaction Summary */}
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <OrderStatus status="completed" />

          <div className="text-center">
            <div className="text-xl font-pixel text-accent">{order.amount} MXN</div>
            <div className="text-xs text-muted-foreground">Cobrado exitosamente</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-center">
            <div>
              <div className="font-pixel text-primary">{monAmount} MON</div>
              <div className="text-muted-foreground">Liberado del escrow</div>
            </div>
            <div>
              <div className="font-pixel text-secondary">{bondAmount} MON</div>
              <div className="text-muted-foreground">Bond devuelto</div>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Transaction Details */}
      <AztecBorder variant="primary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Detalles de la Transacción</div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Tasa aplicada:</span>
              <span className="font-pixel">{order.cr} MON/MXN</span>
            </div>
            <div className="flex justify-between">
              <span>Comisión ACAL:</span>
              <span className="font-pixel">{order.commission} MXN</span>
            </div>
            <div className="flex justify-between">
              <span>Hash de orden:</span>
              <span className="font-mono text-xs break-all">{order.hashQR}</span>
            </div>
            <div className="flex justify-between">
              <span>Completado:</span>
              <span className="font-pixel">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Success Message */}
      <AztecBorder variant="secondary">
        <div className="text-center space-y-3">
          <div className="text-sm font-pixel">¡Gracias por usar ACAL!</div>
          <div className="text-xs text-muted-foreground">
            Tu canoa digital completó exitosamente el viaje entre Monad y pesos mexicanos. Los MON han sido liberados
            del escrow y están disponibles en tu wallet.
          </div>
        </div>
      </AztecBorder>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton pixelVariant="secondary" onClick={onBackToHome} className="flex-1">
          Ir al Inicio
        </PixelButton>
        <PixelButton pixelVariant="primary" onClick={onNewTransaction} className="flex-1">
          Nueva Transacción
        </PixelButton>
      </div>
    </div>
  )
}
