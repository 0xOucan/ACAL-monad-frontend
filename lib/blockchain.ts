// Blockchain configuration and utilities for ACAL
export const MONAD_TESTNET_CONFIG = {
  chainId: "0x29A", // 666 in hex (Monad testnet)
  chainName: "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: ["https://testnet-rpc.monad.xyz"],
  blockExplorerUrls: ["https://testnet-explorer.monad.xyz"],
}

export const ACAL_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" // Mock contract address

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string
  chainId: string | null
}

export interface Transaction {
  hash: string
  status: "pending" | "confirmed" | "failed"
  type: "deposit" | "release" | "cancel"
  amount: string
  timestamp: number
}

// Mock blockchain functions for demo
export const connectWallet = async (): Promise<WalletState> => {
  // Simulate wallet connection
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isConnected: true,
        address: "0xabcd1234567890abcdef1234567890abcdef1234",
        balance: "125.4567",
        chainId: MONAD_TESTNET_CONFIG.chainId,
      })
    }, 2000)
  })
}

export const disconnectWallet = async (): Promise<void> => {
  // Simulate wallet disconnection
  return new Promise((resolve) => {
    setTimeout(resolve, 500)
  })
}

export const switchToMonadNetwork = async (): Promise<boolean> => {
  // Simulate network switch
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500)
  })
}

export const depositToEscrow = async (amount: string, orderId: string): Promise<Transaction> => {
  // Simulate escrow deposit transaction
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: "pending",
        type: "deposit",
        amount,
        timestamp: Date.now(),
      })
    }, 3000)
  })
}

export const releaseFromEscrow = async (orderId: string): Promise<Transaction> => {
  // Simulate escrow release transaction
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: "pending",
        type: "release",
        amount: "0",
        timestamp: Date.now(),
      })
    }, 2000)
  })
}

export const cancelOrder = async (orderId: string): Promise<Transaction> => {
  // Simulate order cancellation transaction
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        status: "pending",
        type: "cancel",
        amount: "0",
        timestamp: Date.now(),
      })
    }, 1500)
  })
}

export const getTransactionStatus = async (hash: string): Promise<"pending" | "confirmed" | "failed"> => {
  // Simulate transaction status check
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly resolve as confirmed for demo
      resolve(Math.random() > 0.1 ? "confirmed" : "failed")
    }, 2000)
  })
}

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatBalance = (balance: string): string => {
  return Number.parseFloat(balance).toFixed(4)
}
