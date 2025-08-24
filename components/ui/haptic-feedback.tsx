"use client"

import type React from "react"

interface HapticFeedbackProps {
  children: React.ReactNode
  intensity?: "light" | "medium" | "heavy"
  onTap?: () => void
}

export function HapticFeedback({ children, intensity = "medium", onTap }: HapticFeedbackProps) {
  const handleClick = () => {
    // Simulate haptic feedback with visual feedback
    if (navigator.vibrate) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
      }
      navigator.vibrate(patterns[intensity])
    }
    onTap?.()
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  )
}
