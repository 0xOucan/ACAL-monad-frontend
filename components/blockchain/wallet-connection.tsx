"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"
import { connectWallet, disconnectWallet, type WalletState, formatAddress, formatBalance } from "@/lib/blockchain"

interface WalletConnectionProps {
  onWalletConnected: (wallet: WalletState) => void
  currentWallet?: WalletState | null
}

export function WalletConnection({ onWalletConnected, currentWallet }: WalletConnectionProps) {
  const [connecting, setConnecting] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const wallet = await connectWallet()
      onWalletConnected(wallet)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    setDisconnecting(true)
    try {
      await disconnectWallet()
      onWalletConnected({
        isConnected: false,
        address: null,
        balance: "0",
        chainId: null,
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    } finally {
      setDisconnecting(false)
    }
  }

  if (connecting) {
    return (
      <AztecBorder variant="primary">
        <div className="space-y-4 text-center">
          <div className="text-sm font-pixel">Conectando Wallet</div>
          <LoadingWaves />
          <div className="text-xs text-muted-foreground">Confirma en tu wallet...</div>
        </div>
      </AztecBorder>
    )
  }

  if (currentWallet?.isConnected) {
    return (
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <div className="text-sm font-pixel text-center">Wallet Conectada</div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span>Dirección:</span>
              <span className="font-mono">{formatAddress(currentWallet.address!)}</span>
            </div>
            <div className="flex justify-between">
              <span>Balance MON:</span>
              <span className="font-pixel text-primary">{formatBalance(currentWallet.balance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Red:</span>
              <span className="font-pixel text-secondary">Monad Testnet</span>
            </div>
          </div>

          <PixelButton pixelVariant="secondary" onClick={handleDisconnect} disabled={disconnecting} className="w-full">
            {disconnecting ? "Desconectando..." : "Desconectar"}
          </PixelButton>
        </div>
      </AztecBorder>
    )
  }

  return (
    <AztecBorder variant="primary">
      <div className="space-y-4 text-center">
        <div className="text-sm font-pixel">Conectar Wallet</div>
        <div className="text-xs text-muted-foreground">Necesitas conectar tu wallet para usar ACAL</div>

        <div className="space-y-3">
          <PixelButton pixelVariant="primary" onClick={handleConnect} className="w-full">
            Conectar MetaMask
          </PixelButton>

          <div className="text-xs text-muted-foreground">Asegúrate de estar en Monad Testnet</div>
        </div>
      </div>
    </AztecBorder>
  )
}
