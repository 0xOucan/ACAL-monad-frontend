"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { OrderMarketplace, type MarketOrder } from "@/components/taker/order-marketplace"
import { OrderDetails } from "@/components/taker/order-details"
import { EscrowDeposit } from "@/components/taker/escrow-deposit"
import { QRDownload } from "@/components/taker/qr-download"
import { TransactionComplete } from "@/components/taker/transaction-complete"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { Canoe } from "@/components/pixel-art/canoe"

type TakerStep = "marketplace" | "details" | "deposit" | "download" | "complete"

export default function TakerPage() {
  const [currentStep, setCurrentStep] = useState<TakerStep>("marketplace")
  const [selectedOrder, setSelectedOrder] = useState<MarketOrder | null>(null)
  const router = useRouter()

  const handleSelectOrder = (order: MarketOrder) => {
    console.log("[v0] handleSelectOrder called with:", order)
    setSelectedOrder(order)
    setCurrentStep("details")
    console.log("[v0] State updated - step: details, order:", order.id)
  }

  const handleLockOrder = () => {
    setCurrentStep("deposit")
  }

  const handleDepositComplete = () => {
    setCurrentStep("download")
  }

  const handlePaymentReceived = () => {
    setCurrentStep("complete")
  }

  const handleNewTransaction = () => {
    setCurrentStep("marketplace")
    setSelectedOrder(null)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleBack = () => {
    switch (currentStep) {
      case "details":
        setCurrentStep("marketplace")
        break
      case "deposit":
        setCurrentStep("details")
        break
      default:
        setCurrentStep("marketplace")
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "marketplace":
        return <OrderMarketplace onSelectOrder={handleSelectOrder} />

      case "details":
        return selectedOrder ? (
          <OrderDetails order={selectedOrder} onLockOrder={handleLockOrder} onBack={handleBack} />
        ) : null

      case "deposit":
        return selectedOrder ? (
          <EscrowDeposit order={selectedOrder} onDepositComplete={handleDepositComplete} onCancel={handleBack} />
        ) : null

      case "download":
        return selectedOrder ? <QRDownload order={selectedOrder} onPaymentReceived={handlePaymentReceived} /> : null

      case "complete":
        return selectedOrder ? (
          <TransactionComplete
            order={selectedOrder}
            onNewTransaction={handleNewTransaction}
            onBackToHome={handleBackToHome}
          />
        ) : null

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "marketplace":
        return "Mercado"
      case "details":
        return "Paso 1 de 3"
      case "deposit":
        return "Paso 2 de 3"
      case "download":
        return "Paso 3 de 3"
      case "complete":
        return "Completado"
      default:
        return ""
    }
  }

  const getCanoeState = () => {
    switch (currentStep) {
      case "marketplace":
        return "empty"
      case "details":
        return "empty"
      case "deposit":
        return "passenger"
      case "download":
        return "passenger"
      case "complete":
        return "golden"
      default:
        return "empty"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Canoe state={getCanoeState() as any} size="md" />
          </div>
          <h1 className="text-xl font-pixel text-foreground mb-1">Flujo Taker</h1>
          <div className="text-xs font-pixel text-muted-foreground">{getStepTitle()}</div>
        </div>

        {/* Progress Indicator */}
        {!["marketplace", "complete"].includes(currentStep) && (
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => {
                const stepNames = ["details", "deposit", "download"]
                const isActive = stepNames.indexOf(currentStep) >= step - 1
                return <div key={step} className={`w-3 h-3 pixel-art ${isActive ? "bg-primary" : "bg-muted"}`} />
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="space-y-6">{renderStep()}</div>

        {/* Back to Home */}
        {currentStep === "marketplace" && (
          <div className="mt-8 text-center">
            <PixelButton pixelVariant="secondary" onClick={handleBackToHome}>
              Volver al Inicio
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  )
}
