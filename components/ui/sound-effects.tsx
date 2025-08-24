"use client"

import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  sound: "click" | "success" | "error" | "coin" | "splash"
  play: boolean
  onComplete?: () => void
}

export function SoundEffects({ sound, play, onComplete }: SoundEffectsProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (play && audioRef.current) {
      // Simulate retro game sounds with Web Audio API or simple beeps
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const frequencies = {
        click: 800,
        success: [523, 659, 784], // C-E-G chord
        error: 200,
        coin: [1047, 1319], // C-E high
        splash: 150,
      }

      const freq = frequencies[sound]

      if (Array.isArray(freq)) {
        // Play chord
        freq.forEach((f, i) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(f, audioContext.currentTime)
            oscillator.type = "square" // Retro square wave

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
          }, i * 100)
        })
      } else {
        // Play single tone
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
        oscillator.type = "square"

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
      }

      setTimeout(() => onComplete?.(), 300)
    }
  }, [play, sound, onComplete])

  return null
}
