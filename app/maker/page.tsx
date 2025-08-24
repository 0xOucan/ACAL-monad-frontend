"use client"

import { useState } from "react"
import { QRUpload } from "@/components/maker/qr-upload"
import { AmountConfirmation } from "@/components/maker/amount-confirmation"
import { OrderPreview, type OrderData } from "@/components/maker/order-preview"
import { WaitingForTaker } from "@/components/maker/waiting-for-taker"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { Canoe } from "@/components/pixel-art/canoe"

type MakerStep = "upload" | "confirm" | "preview" | "waiting"

export default function MakerPage() {
  const [currentStep, setCurrentStep] = useState<MakerStep>("upload")
  const [qrFile, setQrFile] = useState<File | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  const handleQRUploaded = (file: File, detectedAmount: number) => {
    setQrFile(file)
    setAmount(detectedAmount)
    setCurrentStep("confirm")
  }

  const handleAmountConfirmed = (finalAmount: number) => {
    setAmount(finalAmount)
    setCurrentStep("preview")
  }

  const handleOrderPublished = (data: OrderData) => {
    setOrderData(data)
    setCurrentStep("waiting")
  }

  const handleCancel = () => {
    // Reset to initial state
    setCurrentStep("upload")
    setQrFile(null)
    setAmount(0)
    setOrderData(null)
  }

  const handleNewOrder = () => {
    handleCancel()
  }

  const renderStep = () => {
    switch (currentStep) {
      case "upload":
        return <QRUpload onQRUploaded={handleQRUploaded} />

      case "confirm":
        return qrFile ? (
          <AmountConfirmation
            detectedAmount={amount}
            qrFile={qrFile}
            onConfirm={handleAmountConfirmed}
            onBack={() => setCurrentStep("upload")}
          />
        ) : null

      case "preview":
        return qrFile ? (
          <OrderPreview
            amount={amount}
            qrFile={qrFile}
            onPublish={handleOrderPublished}
            onBack={() => setCurrentStep("confirm")}
          />
        ) : null

      case "waiting":
        return orderData ? (
          <WaitingForTaker orderData={orderData} onCancel={handleCancel} onNewOrder={handleNewOrder} />
        ) : null

      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "upload":
        return "Paso 1 de 4"
      case "confirm":
        return "Paso 2 de 4"
      case "preview":
        return "Paso 3 de 4"
      case "waiting":
        return "Orden Activa"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Canoe state="empty" size="md" />
          </div>
          <h1 className="text-xl font-pixel text-foreground mb-1">Flujo Maker</h1>
          <div className="text-xs font-pixel text-muted-foreground">{getStepTitle()}</div>
        </div>

        {/* Progress Indicator */}
        {currentStep !== "waiting" && (
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => {
                const stepNames = ["upload", "confirm", "preview"]
                const isActive = stepNames.indexOf(currentStep) >= step - 1
                return <div key={step} className={`w-3 h-3 pixel-art ${isActive ? "bg-primary" : "bg-muted"}`} />
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="space-y-6">{renderStep()}</div>

        {/* Back to Home */}
        {currentStep === "upload" && (
          <div className="mt-8 text-center">
            <PixelButton pixelVariant="secondary" onClick={() => window.history.back()}>
              Volver al Inicio
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  )
}
