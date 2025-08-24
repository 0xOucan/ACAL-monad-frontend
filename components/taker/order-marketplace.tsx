"use client"

import { useState, useEffect } from "react"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { CurrencyIcon } from "@/components/pixel-art/currency-icon"
import { OrderStatus } from "@/components/pixel-art/order-status"
import { Canoe } from "@/components/pixel-art/canoe"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"

export interface MarketOrder {
  id: string
  amount: number
  cr: string
  expiresAt: number
  hashQR: string
  makerAddress: string
  commission: number
}

interface OrderMarketplaceProps {
  onSelectOrder: (order: MarketOrder) => void
}

export function OrderMarketplace({ onSelectOrder }: OrderMarketplaceProps) {
  const [orders, setOrders] = useState<MarketOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading orders from blockchain
    setTimeout(() => {
      const mockOrders: MarketOrder[] = [
        {
          id: "1",
          amount: 250,
          cr: "20.5432",
          expiresAt: Date.now() + 3600000, // 1 hour
          hashQR: "0x1a2b3c4d...ef56",
          makerAddress: "0xabcd...1234",
          commission: 12,
        },
        {
          id: "2",
          amount: 150,
          cr: "20.4891",
          expiresAt: Date.now() + 7200000, // 2 hours
          hashQR: "0x5e6f7g8h...ij90",
          makerAddress: "0xefgh...5678",
          commission: 12,
        },
        {
          id: "3",
          amount: 400,
          cr: "20.6123",
          expiresAt: Date.now() + 1800000, // 30 minutes
          hashQR: "0x9k0l1m2n...op34",
          makerAddress: "0xijkl...9012",
          commission: 12,
        },
      ]
      setOrders(mockOrders)
      setLoading(false)
    }, 2000)
  }, [])

  const formatTimeRemaining = (expiresAt: number) => {
    const remaining = expiresAt - Date.now()
    const hours = Math.floor(remaining / 3600000)
    const minutes = Math.floor((remaining % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  const calculateMonAmount = (mxnAmount: number, cr: string) => {
    return (mxnAmount / Number.parseFloat(cr)).toFixed(4)
  }

  const handleOrderClick = (order: MarketOrder) => {
    console.log("[v0] Order clicked:", order.id)
    onSelectOrder(order)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-pixel mb-2">Cargando Órdenes</h2>
          <LoadingWaves />
        </div>
        <AztecBorder variant="primary">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Canoe state="empty" size="md" className="animate-pulse" />
            </div>
            <div className="text-xs text-muted-foreground">Buscando canoas disponibles en la red...</div>
          </div>
        </AztecBorder>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-lg font-pixel">Mercado de Órdenes</h2>
        <AztecBorder variant="secondary">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Canoe state="sunken" size="md" />
            </div>
            <div className="text-sm font-pixel">No hay órdenes disponibles</div>
            <div className="text-xs text-muted-foreground">Vuelve más tarde o crea una orden como Maker</div>
          </div>
        </AztecBorder>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Mercado de Órdenes</h2>
        <p className="text-xs text-muted-foreground">Selecciona una canoa para abordar</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <AztecBorder
            key={order.id}
            variant="accent"
            className="cursor-pointer hover:scale-105 transition-transform active:scale-95"
            onClick={() => handleOrderClick(order)}
          >
            <div className="space-y-3">
              {/* Header with canoe and amount */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Canoe state="empty" size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <CurrencyIcon currency="MXN" size="sm" />
                      <span className="font-pixel text-lg text-primary">{order.amount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">MXN disponibles</div>
                  </div>
                </div>
                <OrderStatus status="open" className="bg-transparent p-0" />
              </div>

              {/* Exchange details */}
              <div className="grid grid-cols-3 gap-3 text-xs text-center">
                <div>
                  <div className="font-pixel text-secondary">{order.cr}</div>
                  <div className="text-muted-foreground">CR MON/MXN</div>
                </div>
                <div>
                  <div className="font-pixel text-accent">{calculateMonAmount(order.amount, order.cr)}</div>
                  <div className="text-muted-foreground">MON necesarios</div>
                </div>
                <div>
                  <div className="font-pixel text-primary">{formatTimeRemaining(order.expiresAt)}</div>
                  <div className="text-muted-foreground">Expira en</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs">
                <div className="text-muted-foreground">
                  Maker: {order.makerAddress.slice(0, 6)}...{order.makerAddress.slice(-4)}
                </div>
                <div className="font-pixel text-accent">Tomar Orden →</div>
              </div>
            </div>
          </AztecBorder>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        {orders.length} canoa{orders.length !== 1 ? "s" : ""} disponible{orders.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
