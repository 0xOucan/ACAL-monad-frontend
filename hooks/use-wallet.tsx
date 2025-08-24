"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { Transaction } from "@/lib/blockchain"

export interface Wallet {
  address: string
  balance: string
  network: string
  isConnected: boolean
}

interface WalletContextType {
  wallet: Wallet | null
  transactions: Transaction[]
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (hash: string, status: "pending" | "confirmed" | "failed") => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Simulate a connected wallet for demo purposes
    const demoWallet: Wallet = {
      address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      balance: "1250.5432",
      network: "Monad Testnet",
      isConnected: true,
    }
    setWallet(demoWallet)
  }, [])

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      const mockWallet: Wallet = {
        address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
        balance: "1250.5432",
        network: "Monad Testnet",
        isConnected: true,
      }
      setWallet(mockWallet)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setWallet(null)
    setTransactions([])
  }

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev])
  }

  const updateTransaction = (hash: string, status: "pending" | "confirmed" | "failed") => {
    setTransactions((prev) => prev.map((tx) => (tx.hash === hash ? { ...tx, status } : tx)))
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        transactions,
        connectWallet,
        disconnectWallet,
        addTransaction,
        updateTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
