"use client"

import type React from "react"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { CurrencyIcon } from "@/components/pixel-art/currency-icon"

interface AmountConfirmationProps {
  detectedAmount: number
  qrFile: File
  onConfirm: (finalAmount: number) => void
  onBack: () => void
}

export function AmountConfirmation({ detectedAmount, qrFile, onConfirm, onBack }: AmountConfirmationProps) {
  const [amount, setAmount] = useState(detectedAmount)
  const commission = 12
  const totalReceived = amount - commission

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    if (value >= 100 && value <= 500) {
      setAmount(value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Confirmar Monto</h2>
        <p className="text-xs text-muted-foreground">Verifica que el monto sea correcto</p>
      </div>

      {/* QR Preview */}
      <AztecBorder variant="secondary" className="text-center">
        <div className="space-y-3">
          <div className="text-sm font-pixel">QR OXXO Detectado</div>
          <div className="w-20 h-20 mx-auto bg-gray-200 rounded pixel-art flex items-center justify-center">
            <img
              src={URL.createObjectURL(qrFile) || "/placeholder.svg"}
              alt="QR Code"
              className="w-full h-full object-cover rounded pixel-art"
            />
          </div>
        </div>
      </AztecBorder>

      {/* Amount Input */}
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CurrencyIcon currency="MXN" size="md" />
            <div className="text-center">
              <label className="block text-xs font-pixel mb-2">Monto MXN</label>
              <input
                type="number"
                min="100"
                max="500"
                value={amount}
                onChange={handleAmountChange}
                className="w-24 px-3 py-2 text-center font-pixel text-lg bg-input border-2 border-border rounded pixel-art focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="text-xs text-center text-muted-foreground">Rango: 100 - 500 MXN</div>
        </div>
      </AztecBorder>

      {/* Calculation Breakdown */}
      <AztecBorder variant="primary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center mb-3">Resumen</div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Monto OXXO:</span>
              <span className="font-pixel">{amount} MXN</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Comisión ACAL:</span>
              <span className="font-pixel">-{commission} MXN</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between font-pixel text-primary">
              <span>Recibirás:</span>
              <span>{totalReceived} MXN</span>
            </div>
          </div>
        </div>
      </AztecBorder>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton pixelVariant="secondary" onClick={onBack} className="flex-1">
          Atrás
        </PixelButton>
        <PixelButton
          pixelVariant="primary"
          onClick={() => onConfirm(amount)}
          className="flex-1"
          disabled={amount < 100 || amount > 500}
        >
          Confirmar
        </PixelButton>
      </div>
    </div>
  )
}
