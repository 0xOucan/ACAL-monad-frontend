"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"
import { HapticFeedback } from "@/components/ui/haptic-feedback"
import { SoundEffects } from "@/components/ui/sound-effects"

interface PixelButtonProps extends React.ComponentProps<typeof Button> {
  pixelVariant?: "primary" | "secondary" | "accent" | "danger"
  soundEffect?: "click" | "success" | "error" | "coin"
  hapticIntensity?: "light" | "medium" | "heavy"
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  (
    {
      className,
      pixelVariant = "primary",
      soundEffect = "click",
      hapticIntensity = "medium",
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [playSound, setPlaySound] = useState(false)

    const pixelStyles = {
      primary:
        "bg-[var(--acal-turquoise)] hover:bg-[var(--acal-turquoise)]/80 text-white border-2 border-[var(--acal-navy)] shadow-[4px_4px_0px_var(--acal-navy)]",
      secondary:
        "bg-[var(--acal-navy)] hover:bg-[var(--acal-navy)]/80 text-white border-2 border-[var(--acal-turquoise)] shadow-[4px_4px_0px_var(--acal-turquoise)]",
      accent:
        "bg-[var(--acal-gold)] hover:bg-[var(--acal-gold)]/80 text-[var(--acal-obsidian)] border-2 border-[var(--acal-obsidian)] shadow-[4px_4px_0px_var(--acal-obsidian)]",
      danger:
        "bg-red-600 hover:bg-red-700 text-white border-2 border-red-800 shadow-[4px_4px_0px_theme(colors.red.800)]",
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPlaySound(true)
      setTimeout(() => setPlaySound(false), 100)
      onClick?.(e)
    }

    return (
      <HapticFeedback intensity={hapticIntensity}>
        <Button
          ref={ref}
          className={cn(
            "pixel-art font-pixel text-xs transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px] active:translate-x-1 active:translate-y-1 active:shadow-none hover:pixel-button-hover active:pixel-button-press scale-on-hover",
            pixelStyles[pixelVariant],
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Button>
        <SoundEffects sound={soundEffect} play={playSound} />
      </HapticFeedback>
    )
  },
)

PixelButton.displayName = "PixelButton"
