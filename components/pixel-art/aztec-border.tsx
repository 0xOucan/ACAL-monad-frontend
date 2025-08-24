"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AztecBorderProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent"
  className?: string
  onClick?: () => void
}

export function AztecBorder({ children, variant = "primary", className, onClick }: AztecBorderProps) {
  const borderPatterns = {
    primary:
      "border-4 border-[var(--acal-turquoise)] bg-gradient-to-r from-[var(--acal-turquoise)]/10 to-[var(--acal-gold)]/10",
    secondary:
      "border-4 border-[var(--acal-navy)] bg-gradient-to-r from-[var(--acal-navy)]/10 to-[var(--acal-turquoise)]/10",
    accent:
      "border-4 border-[var(--acal-gold)] bg-gradient-to-r from-[var(--acal-gold)]/10 to-[var(--acal-turquoise)]/10",
  }

  return (
    <div className={cn("relative pixel-art", borderPatterns[variant], className)} onClick={onClick}>
      {/* Aztec corner decorations */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-[var(--acal-obsidian)] pixel-art" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--acal-obsidian)] pixel-art" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[var(--acal-obsidian)] pixel-art" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--acal-obsidian)] pixel-art" />

      {/* Inner geometric pattern */}
      <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
      <div className="absolute bottom-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

      <div className="relative z-10 p-4">{children}</div>
    </div>
  )
}
