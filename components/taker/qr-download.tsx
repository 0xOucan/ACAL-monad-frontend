"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { Canoe } from "@/components/pixel-art/canoe"
import { OrderStatus } from "@/components/pixel-art/order-status"
import type { MarketOrder } from "./order-marketplace"

interface QRDownloadProps {
  order: MarketOrder
  onPaymentReceived: () => void
}

export function QRDownload({ order, onPaymentReceived }: QRDownloadProps) {
  const [qrDownloaded, setQrDownloaded] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDownloadQR = () => {
    // Simulate QR download
    const link = document.createElement("a")
    link.href = "/oxxo-qr-code.png"
    link.download = `ACAL-QR-${order.id}.png`
    link.click()
    setQrDownloaded(true)
  }

  const handleConfirmPayment = () => {
    if (showConfirmation) {
      onPaymentReceived()
    } else {
      setShowConfirmation(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Cobrar en OXXO</h2>
        <p className="text-xs text-muted-foreground">Descarga el QR y ve a cobrar</p>
      </div>

      {/* Status */}
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <Canoe state="passenger" size="lg" />
        </div>
        <OrderStatus status="locked" />
      </div>

      {/* QR Download Section */}
      <AztecBorder variant="primary">
        <div className="space-y-4 text-center">
          <div className="text-sm font-pixel">QR OXXO Listo</div>

          <div className="w-32 h-32 mx-auto bg-white border-4 border-primary rounded pixel-art flex items-center justify-center">
            <div className="text-xs font-pixel text-center">
              QR
              <br />
              OXXO
              <br />
              {order.amount} MXN
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-lg font-pixel text-primary">{order.amount} MXN</div>
            <div className="text-xs text-muted-foreground">Monto a cobrar</div>
          </div>

          <PixelButton
            pixelVariant={qrDownloaded ? "secondary" : "accent"}
            onClick={handleDownloadQR}
            className="w-full"
          >
            {qrDownloaded ? "QR Descargado ✓" : "Descargar QR"}
          </PixelButton>
        </div>
      </AztecBorder>

      {/* Instructions */}
      <AztecBorder variant="accent">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Instrucciones</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-pixel text-primary">1.</span>
              <span>Ve a cualquier OXXO con el QR descargado</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-pixel text-primary">2.</span>
              <span>Muestra el QR al cajero para cobrar</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-pixel text-primary">3.</span>
              <span>Recibe {order.amount} MXN en efectivo</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-pixel text-primary">4.</span>
              <span>Confirma el pago recibido aquí</span>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Confirmation Warning */}
      {showConfirmation && (
        <AztecBorder variant="primary" className="border-green-500">
          <div className="space-y-3 text-center">
            <div className="text-sm font-pixel text-green-600">✓ Confirmación Final</div>
            <div className="text-xs text-muted-foreground">
              ¿Confirmás que recibiste {order.amount} MXN en OXXO? Esta acción liberará los MON del escrow.
            </div>
          </div>
        </AztecBorder>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {showConfirmation ? (
          <>
            <PixelButton pixelVariant="secondary" onClick={() => setShowConfirmation(false)} className="flex-1">
              Cancelar
            </PixelButton>
            <PixelButton pixelVariant="primary" onClick={handleConfirmPayment} className="flex-1">
              Sí, Recibí MXN
            </PixelButton>
          </>
        ) : (
          <PixelButton
            pixelVariant="primary"
            onClick={handleConfirmPayment}
            className="w-full"
            disabled={!qrDownloaded}
          >
            He Recibido MXN
          </PixelButton>
        )}
      </div>

      {/* Timer */}
      <div className="text-center text-xs text-muted-foreground">Tienes 2 horas para completar el cobro</div>
    </div>
  )
}
