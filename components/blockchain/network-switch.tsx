"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"
import { switchToMonadNetwork, MONAD_TESTNET_CONFIG } from "@/lib/blockchain"

interface NetworkSwitchProps {
  onNetworkSwitched: () => void
}

export function NetworkSwitch({ onNetworkSwitched }: NetworkSwitchProps) {
  const [switching, setSwitching] = useState(false)

  const handleSwitch = async () => {
    setSwitching(true)
    try {
      const success = await switchToMonadNetwork()
      if (success) {
        onNetworkSwitched()
      }
    } catch (error) {
      console.error("Failed to switch network:", error)
    } finally {
      setSwitching(false)
    }
  }

  if (switching) {
    return (
      <AztecBorder variant="primary">
        <div className="space-y-4 text-center">
          <div className="text-sm font-pixel">Cambiando Red</div>
          <LoadingWaves />
          <div className="text-xs text-muted-foreground">Confirma en tu wallet...</div>
        </div>
      </AztecBorder>
    )
  }

  return (
    <AztecBorder variant="primary" className="border-yellow-500">
      <div className="space-y-4 text-center">
        <div className="text-sm font-pixel text-yellow-600">⚠️ Red Incorrecta</div>
        <div className="text-xs text-muted-foreground">ACAL requiere Monad Testnet para funcionar</div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Red requerida:</span>
            <span className="font-pixel">{MONAD_TESTNET_CONFIG.chainName}</span>
          </div>
          <div className="flex justify-between">
            <span>Chain ID:</span>
            <span className="font-mono">{MONAD_TESTNET_CONFIG.chainId}</span>
          </div>
        </div>

        <PixelButton pixelVariant="accent" onClick={handleSwitch} className="w-full">
          Cambiar a Monad
        </PixelButton>
      </div>
    </AztecBorder>
  )
}
