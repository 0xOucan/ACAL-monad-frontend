"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { CurrencyIcon } from "@/components/pixel-art/currency-icon"
import { Canoe } from "@/components/pixel-art/canoe"
import type { MarketOrder } from "./order-marketplace"

interface OrderDetailsProps {
  order: MarketOrder
  onLockOrder: () => void
  onBack: () => void
}

export function OrderDetails({ order, onLockOrder, onBack }: OrderDetailsProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const monAmount = (order.amount / Number.parseFloat(order.cr)).toFixed(4)
  const bondAmount = (Number.parseFloat(monAmount) * 0.1).toFixed(4) // 10% bond
  const totalRequired = (Number.parseFloat(monAmount) + Number.parseFloat(bondAmount)).toFixed(4)

  const formatTimeRemaining = (expiresAt: number) => {
    const remaining = expiresAt - Date.now()
    const hours = Math.floor(remaining / 3600000)
    const minutes = Math.floor((remaining % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  const handleLockOrder = () => {
    if (showConfirmation) {
      onLockOrder()
    } else {
      setShowConfirmation(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Detalles de Orden</h2>
        <p className="text-xs text-muted-foreground">Revisa antes de bloquear MON</p>
      </div>

      {/* Order Overview */}
      <AztecBorder variant="primary">
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Canoe state="empty" size="lg" />
            </div>
            <div className="text-xl font-pixel text-primary">{order.amount} MXN</div>
            <div className="text-xs text-muted-foreground">Recibirás en OXXO</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-center">
            <div>
              <div className="font-pixel text-secondary">{order.cr}</div>
              <div className="text-muted-foreground">Tasa MON/MXN</div>
            </div>
            <div>
              <div className="font-pixel text-accent">{formatTimeRemaining(order.expiresAt)}</div>
              <div className="text-muted-foreground">Tiempo restante</div>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* MON Requirements */}
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <CurrencyIcon currency="MON" size="md" />
            </div>
            <div className="text-sm font-pixel text-center mb-3">MON Requeridos</div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span>Monto principal:</span>
              <span className="font-pixel">{monAmount} MON</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Bond de seguridad (10%):</span>
              <span className="font-pixel">+{bondAmount} MON</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between font-pixel text-primary">
              <span>Total a bloquear:</span>
              <span>{totalRequired} MON</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            El bond se devuelve al completar la transacción
          </div>
        </div>
      </AztecBorder>

      {/* Technical Details */}
      <AztecBorder variant="secondary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Información Técnica</div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-muted-foreground">Hash QR:</span>
              <div className="font-mono text-primary break-all">{order.hashQR}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Maker:</span>
              <div className="font-mono text-secondary break-all">{order.makerAddress}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Comisión ACAL:</span>
              <span className="font-pixel text-accent ml-2">{order.commission} MXN</span>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Confirmation Warning */}
      {showConfirmation && (
        <AztecBorder variant="primary" className="border-yellow-500">
          <div className="space-y-3 text-center">
            <div className="text-sm font-pixel text-yellow-600">⚠️ Confirmación</div>
            <div className="text-xs text-muted-foreground">
              Al bloquear MON, te comprometes a completar la transacción. Solo confirma si estás seguro de poder cobrar
              en OXXO.
            </div>
          </div>
        </AztecBorder>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton
          pixelVariant="secondary"
          onClick={showConfirmation ? () => setShowConfirmation(false) : onBack}
          className="flex-1"
        >
          {showConfirmation ? "Cancelar" : "Atrás"}
        </PixelButton>
        <PixelButton
          pixelVariant={showConfirmation ? "primary" : "accent"}
          onClick={handleLockOrder}
          className="flex-1"
        >
          {showConfirmation ? "Confirmar Bloqueo" : "Bloquear MON"}
        </PixelButton>
      </div>
    </div>
  )
}
