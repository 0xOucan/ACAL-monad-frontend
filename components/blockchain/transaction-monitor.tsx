"use client"

import { useState, useEffect } from "react"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"
import { getTransactionStatus, type Transaction } from "@/lib/blockchain"

interface TransactionMonitorProps {
  transaction: Transaction
  onStatusChange: (status: "pending" | "confirmed" | "failed") => void
}

export function TransactionMonitor({ transaction, onStatusChange }: TransactionMonitorProps) {
  const [status, setStatus] = useState<"pending" | "confirmed" | "failed">(transaction.status)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (status === "pending") {
      const checkStatus = async () => {
        try {
          const newStatus = await getTransactionStatus(transaction.hash)
          setStatus(newStatus)
          onStatusChange(newStatus)
        } catch (error) {
          console.error("Failed to check transaction status:", error)
          setAttempts((prev) => prev + 1)

          // After 3 failed attempts, mark as failed
          if (attempts >= 2) {
            setStatus("failed")
            onStatusChange("failed")
          }
        }
      }

      const interval = setInterval(checkStatus, 3000)
      return () => clearInterval(interval)
    }
  }, [status, transaction.hash, onStatusChange, attempts])

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "text-yellow-600"
      case "confirmed":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Confirmando..."
      case "confirmed":
        return "Confirmada"
      case "failed":
        return "Falló"
      default:
        return "Desconocido"
    }
  }

  const getActionText = () => {
    switch (transaction.type) {
      case "deposit":
        return "Depósito en Escrow"
      case "release":
        return "Liberación de Escrow"
      case "cancel":
        return "Cancelación de Orden"
      default:
        return "Transacción"
    }
  }

  return (
    <AztecBorder variant="secondary">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm font-pixel">{getActionText()}</div>
          <div className={`text-xs font-pixel ${getStatusColor()}`}>{getStatusText()}</div>
        </div>

        {status === "pending" && (
          <div className="flex justify-center">
            <LoadingWaves />
          </div>
        )}

        <div className="space-y-2 text-xs">
          <div>
            <span className="text-muted-foreground">Hash:</span>
            <div className="font-mono text-primary break-all">
              {transaction.hash.slice(0, 20)}...{transaction.hash.slice(-10)}
            </div>
          </div>

          {transaction.amount !== "0" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monto:</span>
              <span className="font-pixel">{transaction.amount} MON</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tiempo:</span>
            <span className="font-pixel">{new Date(transaction.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>

        {status === "failed" && (
          <div className="text-xs text-red-600 text-center">La transacción falló. Intenta nuevamente.</div>
        )}
      </div>
    </AztecBorder>
  )
}
