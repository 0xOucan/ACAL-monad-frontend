"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { CurrencyIcon } from "@/components/pixel-art/currency-icon"
import { Canoe } from "@/components/pixel-art/canoe"

interface OrderPreviewProps {
  amount: number
  qrFile: File
  onPublish: (orderData: OrderData) => void
  onBack: () => void
}

export interface OrderData {
  amount: number
  commission: number
  cr: string
  hashQR: string
  qrFile: File
  timestamp: number
}

export function OrderPreview({ amount, qrFile, onPublish, onBack }: OrderPreviewProps) {
  const [publishing, setPublishing] = useState(false)

  const commission = 12
  const totalReceived = amount - commission

  // Generate mock CR (Conversion Rate) and hash
  const cr = (Math.random() * 0.1 + 20.5).toFixed(4) // Mock MON/MXN rate
  const hashQR = `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`

  const handlePublish = async () => {
    setPublishing(true)

    // Simulate blockchain transaction
    setTimeout(() => {
      const orderData: OrderData = {
        amount,
        commission,
        cr,
        hashQR,
        qrFile,
        timestamp: Date.now(),
      }
      onPublish(orderData)
      setPublishing(false)
    }, 3000)
  }

  if (publishing) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <Canoe state="empty" size="lg" className="animate-pulse" />
        </div>
        <AztecBorder variant="primary">
          <div className="space-y-4">
            <div className="text-sm font-pixel">Publicando Orden...</div>
            <div className="text-xs text-muted-foreground">Registrando en blockchain</div>
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin pixel-art" />
            </div>
          </div>
        </AztecBorder>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Previsualizar Orden</h2>
        <p className="text-xs text-muted-foreground">Revisa los detalles antes de publicar</p>
      </div>

      {/* Order Details */}
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <CurrencyIcon currency="MXN" size="lg" />
            </div>
            <div className="text-xl font-pixel text-primary">{amount} MXN</div>
            <div className="text-xs text-muted-foreground">Monto de la orden</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="text-center">
              <div className="font-pixel text-accent">CR: {cr}</div>
              <div className="text-muted-foreground">Tasa MON/MXN</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-secondary">12 MXN</div>
              <div className="text-muted-foreground">Comisión</div>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Technical Details */}
      <AztecBorder variant="secondary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Detalles Técnicos</div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-muted-foreground">Hash QR:</span>
              <div className="font-mono text-primary break-all">{hashQR}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Estado:</span>
              <span className="font-pixel text-accent ml-2">Listo para publicar</span>
            </div>
            <div>
              <span className="text-muted-foreground">Red:</span>
              <span className="font-pixel text-secondary ml-2">Monad Testnet</span>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Final Summary */}
      <AztecBorder variant="primary">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Canoe state="empty" size="md" />
          </div>
          <div className="text-sm font-pixel">Tu canoa está lista</div>
          <div className="text-xs text-muted-foreground">Una vez publicada, los takers podrán ver tu orden</div>
          <div className="text-lg font-pixel text-primary">{totalReceived} MXN</div>
          <div className="text-xs text-muted-foreground">Recibirás después de comisión</div>
        </div>
      </AztecBorder>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton pixelVariant="secondary" onClick={onBack} className="flex-1">
          Atrás
        </PixelButton>
        <PixelButton pixelVariant="primary" onClick={handlePublish} className="flex-1">
          Publicar Orden
        </PixelButton>
      </div>
    </div>
  )
}
