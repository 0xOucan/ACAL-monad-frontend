"use client"

import { useState } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { Canoe } from "@/components/pixel-art/canoe"
import { TransactionMonitor } from "@/components/blockchain/transaction-monitor"
import { WalletConnection } from "@/components/blockchain/wallet-connection"
import { useWallet } from "@/hooks/use-wallet"
import { depositToEscrow } from "@/lib/blockchain"
import type { MarketOrder } from "./order-marketplace"
import type { Transaction } from "@/lib/blockchain"

interface EscrowDepositProps {
  order: MarketOrder
  onDepositComplete: () => void
  onCancel: () => void
}

export function EscrowDeposit({ order, onDepositComplete, onCancel }: EscrowDepositProps) {
  const { wallet, connectWallet, addTransaction, updateTransaction } = useWallet()
  const [depositing, setDepositing] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)

  const monAmount = (order.amount / Number.parseFloat(order.cr)).toFixed(4)
  const bondAmount = (Number.parseFloat(monAmount) * 0.1).toFixed(4)
  const totalRequired = (Number.parseFloat(monAmount) + Number.parseFloat(bondAmount)).toFixed(4)

  const handleDeposit = async () => {
    if (!wallet?.isConnected) return

    setDepositing(true)
    try {
      const transaction = await depositToEscrow(totalRequired, order.id)
      setCurrentTransaction(transaction)
      addTransaction(transaction)
    } catch (error) {
      console.error("Failed to deposit to escrow:", error)
      setDepositing(false)
    }
  }

  const handleTransactionStatusChange = (status: "pending" | "confirmed" | "failed") => {
    if (currentTransaction) {
      updateTransaction(currentTransaction.hash, status)

      if (status === "confirmed") {
        setTimeout(() => {
          onDepositComplete()
          setDepositing(false)
        }, 1000)
      } else if (status === "failed") {
        setDepositing(false)
        setCurrentTransaction(null)
      }
    }
  }

  // Show wallet connection if not connected
  if (!wallet?.isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-pixel mb-2">Conectar Wallet</h2>
          <p className="text-xs text-muted-foreground">Necesitas conectar tu wallet para continuar</p>
        </div>

        <WalletConnection onWalletConnected={connectWallet} currentWallet={wallet} />

        <PixelButton pixelVariant="secondary" onClick={onCancel} className="w-full">
          Cancelar
        </PixelButton>
      </div>
    )
  }

  // Show transaction monitor if depositing
  if (depositing && currentTransaction) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-pixel mb-2">Depositando en Escrow</h2>
          <p className="text-xs text-muted-foreground">Procesando transacción blockchain</p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Canoe state="passenger" size="lg" className="animate-pulse" />
          </div>
        </div>

        <TransactionMonitor transaction={currentTransaction} onStatusChange={handleTransactionStatusChange} />

        <div className="text-center text-xs text-muted-foreground">No cierres la app durante el proceso</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Depósito en Escrow</h2>
        <p className="text-xs text-muted-foreground">Bloquea MON para tomar la orden</p>
      </div>

      {/* Wallet Info */}
      <WalletConnection onWalletConnected={connectWallet} currentWallet={wallet} />

      {/* Canoe Animation */}
      <div className="text-center">
        <div className="flex justify-center">
          <Canoe state="empty" size="lg" />
        </div>
        <div className="text-xs text-muted-foreground mt-2">Tu canoa está lista para abordar</div>
      </div>

      {/* Deposit Summary */}
      <AztecBorder variant="accent">
        <div className="space-y-4">
          <div className="text-sm font-pixel text-center">Resumen del Depósito</div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span>Orden MXN:</span>
              <span className="font-pixel">{order.amount} MXN</span>
            </div>
            <div className="flex justify-between">
              <span>MON principal:</span>
              <span className="font-pixel">{monAmount} MON</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Bond seguridad:</span>
              <span className="font-pixel">{bondAmount} MON</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between font-pixel text-primary">
              <span>Total a bloquear:</span>
              <span>{totalRequired} MON</span>
            </div>
          </div>

          {/* Balance Check */}
          {wallet && Number.parseFloat(wallet.balance) < Number.parseFloat(totalRequired) && (
            <div className="text-xs text-red-600 text-center">
              ⚠️ Balance insuficiente. Necesitas {totalRequired} MON
            </div>
          )}
        </div>
      </AztecBorder>

      {/* Security Info */}
      <AztecBorder variant="secondary">
        <div className="space-y-3">
          <div className="text-sm font-pixel text-center">Seguridad</div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>• Los MON se bloquean en contrato inteligente</div>
            <div>• Solo se liberan al confirmar pago recibido</div>
            <div>• El bond se devuelve automáticamente</div>
            <div>• Transacción reversible en caso de disputa</div>
          </div>
        </div>
      </AztecBorder>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <PixelButton pixelVariant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </PixelButton>
        <PixelButton
          pixelVariant="primary"
          onClick={handleDeposit}
          className="flex-1"
          disabled={!wallet || Number.parseFloat(wallet.balance) < Number.parseFloat(totalRequired)}
        >
          Depositar MON
        </PixelButton>
      </div>
    </div>
  )
}
