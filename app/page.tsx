"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Canoe } from "@/components/pixel-art/canoe"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecPattern } from "@/components/pixel-art/aztec-pattern"
import { CurrencyIcon } from "@/components/pixel-art/currency-icon"
import { HapticFeedback } from "@/components/ui/haptic-feedback"
import { SoundEffects } from "@/components/ui/sound-effects"
import { useWallet } from "@/hooks/use-wallet"
import { formatAddress } from "@/lib/blockchain"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [playWelcomeSound, setPlayWelcomeSound] = useState(false)
  const router = useRouter()
  const { wallet } = useWallet()

  const handleStartJourney = () => {
    setPlayWelcomeSound(true)
    setTimeout(() => {
      setShowOnboarding(false)
      setPlayWelcomeSound(false)
    }, 300)
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-accent/10 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center fade-in-up">
          {/* Logo with actual canoe pixel art */}
          <div className="flex justify-center">
            <Canoe state="empty" size="lg" animated={true} />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-pixel text-foreground leading-relaxed">ACAL</h1>
            <p className="text-sm font-pixel text-accent-foreground leading-relaxed">Tu canoa a Monad</p>
          </div>

          <AztecBorder variant="primary">
            <div className="flex items-center gap-3 mb-4">
              <AztecPattern variant="geometric" size="sm" />
              <AztecPattern variant="waves" size="sm" />
              <AztecPattern variant="steps" size="sm" />
            </div>
            <p className="text-xs font-sans leading-relaxed text-card-foreground">
              En la antigua Tenochtitlán, las canoas eran el puente entre mundos. Hoy, ACAL es tu canoa digital: de
              pesos mexicanos directo a Monad, en pocos clics y sin complicaciones.
            </p>
          </AztecBorder>

          <div className="space-y-3">
            <PixelButton
              onClick={handleStartJourney}
              className="w-full py-6"
              pixelVariant="primary"
              soundEffect="success"
              hapticIntensity="heavy"
            >
              Comenzar Viaje
            </PixelButton>

            <div className="grid grid-cols-2 gap-3 text-xs font-pixel">
              <div className="text-center flex flex-col items-center gap-2 fade-in-up">
                <CurrencyIcon currency="MXN" size="sm" />
                <div className="text-primary">100-500</div>
                <div className="text-muted-foreground">MXN</div>
              </div>
              <div className="text-center flex flex-col items-center gap-2 fade-in-up">
                <div className="w-6 h-6 bg-accent rounded pixel-art flex items-center justify-center">
                  <span className="text-xs font-pixel text-accent-foreground">$</span>
                </div>
                <div className="text-accent">12 MXN</div>
                <div className="text-muted-foreground">Comisión</div>
              </div>
            </div>
          </div>
        </div>
        <SoundEffects sound="success" play={playWelcomeSound} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header with wallet status */}
        <div className="flex justify-between items-center mb-6 fade-in-up">
          <div className="flex items-center gap-3">
            <Canoe state="passenger" size="sm" animated={true} />
            <div>
              <h1 className="text-lg font-pixel text-foreground">ACAL</h1>
              <div className="text-xs text-muted-foreground">Tu canoa a Monad</div>
            </div>
          </div>

          <PixelButton
            pixelVariant={wallet?.isConnected ? "accent" : "secondary"}
            onClick={() => router.push("/wallet")}
            className="text-xs"
            soundEffect="click"
          >
            {wallet?.isConnected ? formatAddress(wallet.address!) : "Conectar"}
          </PixelButton>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-xl font-pixel text-foreground fade-in-up">Elige tu flujo</h2>

          <div className="grid gap-4 max-w-sm mx-auto">
            <HapticFeedback intensity="medium">
              <AztecBorder variant="accent">
                <div
                  className="space-y-3 cursor-pointer scale-on-hover slide-in-bottom"
                  onClick={() => router.push("/maker")}
                >
                  <div className="flex justify-center">
                    <CurrencyIcon currency="MXN" size="lg" />
                  </div>
                  <h3 className="font-pixel text-sm">Maker</h3>
                  <p className="text-xs text-muted-foreground">Tengo MXN, quiero MON</p>
                  <div className="flex justify-center">
                    <Canoe state="empty" size="sm" animated={true} />
                  </div>
                </div>
              </AztecBorder>
            </HapticFeedback>

            <HapticFeedback intensity="medium">
              <AztecBorder variant="secondary">
                <div
                  className="space-y-3 cursor-pointer scale-on-hover slide-in-bottom"
                  onClick={() => router.push("/taker")}
                >
                  <div className="flex justify-center">
                    <CurrencyIcon currency="MON" size="lg" />
                  </div>
                  <h3 className="font-pixel text-sm">Taker</h3>
                  <p className="text-xs text-muted-foreground">Tengo MON, quiero MXN</p>
                  <div className="flex justify-center">
                    <Canoe state="passenger" size="sm" animated={true} />
                  </div>
                </div>
              </AztecBorder>
            </HapticFeedback>
          </div>

          {/* Wallet Status */}
          {wallet?.isConnected && (
            <AztecBorder variant="primary">
              <div className="text-center space-y-2 fade-in-up">
                <div className="text-sm font-pixel">Wallet Conectada</div>
                <div className="text-xs text-muted-foreground">
                  {formatAddress(wallet.address!)} • {Number.parseFloat(wallet.balance).toFixed(2)} MON
                </div>
              </div>
            </AztecBorder>
          )}
        </div>
      </div>
    </div>
  )
}
