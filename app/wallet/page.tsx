"use client"

import { useRouter } from "next/navigation"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { Canoe } from "@/components/pixel-art/canoe"
import { WalletConnection } from "@/components/blockchain/wallet-connection"
import { TransactionMonitor } from "@/components/blockchain/transaction-monitor"
import { useWallet } from "@/hooks/use-wallet"
import { formatBalance } from "@/lib/blockchain"

export default function WalletPage() {
  const router = useRouter()
  const { wallet, transactions, connectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Canoe state={wallet?.isConnected ? "passenger" : "empty"} size="md" />
          </div>
          <h1 className="text-xl font-pixel text-foreground mb-1">Mi Wallet</h1>
          <div className="text-xs font-pixel text-muted-foreground">
            {wallet?.isConnected ? "Conectada" : "Desconectada"}
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="space-y-6">
          <WalletConnection onWalletConnected={connectWallet} currentWallet={wallet} />

          {/* Wallet Details */}
          {wallet?.isConnected && (
            <AztecBorder variant="primary">
              <div className="space-y-4">
                <div className="text-sm font-pixel text-center">Detalles de Wallet</div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Dirección completa:</span>
                    <div className="font-mono text-primary break-all">{wallet.address}</div>
                  </div>
                  <div className="flex justify-between">
                    <span>Balance disponible:</span>
                    <span className="font-pixel text-accent">{formatBalance(wallet.balance)} MON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Red:</span>
                    <span className="font-pixel text-secondary">Monad Testnet</span>
                  </div>
                </div>
              </div>
            </AztecBorder>
          )}

          {/* Transaction History */}
          {wallet?.isConnected && transactions.length > 0 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-pixel">Historial</h2>
                <p className="text-xs text-muted-foreground">Últimas transacciones</p>
              </div>

              {transactions.slice(0, 5).map((transaction) => (
                <TransactionMonitor
                  key={transaction.hash}
                  transaction={transaction}
                  onStatusChange={() => {}} // Status updates handled by individual monitors
                />
              ))}

              {transactions.length > 5 && (
                <div className="text-center text-xs text-muted-foreground">
                  Y {transactions.length - 5} transacciones más...
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {wallet?.isConnected && transactions.length === 0 && (
            <AztecBorder variant="secondary">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Canoe state="empty" size="md" />
                </div>
                <div className="text-sm font-pixel">Sin Transacciones</div>
                <div className="text-xs text-muted-foreground">Tus transacciones aparecerán aquí cuando uses ACAL</div>
              </div>
            </AztecBorder>
          )}

          {/* Back Button */}
          <div className="text-center">
            <PixelButton pixelVariant="secondary" onClick={() => router.push("/")}>
              Volver al Inicio
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  )
}
