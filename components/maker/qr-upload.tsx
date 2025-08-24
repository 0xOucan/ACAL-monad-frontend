"use client"

import type React from "react"

import { useState, useRef } from "react"
import { PixelButton } from "@/components/pixel-art/pixel-button"
import { AztecBorder } from "@/components/pixel-art/aztec-border"
import { LoadingWaves } from "@/components/pixel-art/loading-waves"

interface QRUploadProps {
  onQRUploaded: (file: File, amount: number) => void
}

export function QRUpload({ onQRUploaded }: QRUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor sube una imagen del QR de OXXO")
      return
    }

    setUploading(true)

    // Simulate QR processing and amount extraction
    setTimeout(() => {
      const mockAmount = Math.floor(Math.random() * 400) + 100 // 100-500 MXN
      onQRUploaded(file, mockAmount)
      setUploading(false)
    }, 2000)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  if (uploading) {
    return (
      <AztecBorder variant="primary" className="text-center">
        <div className="space-y-4">
          <div className="text-sm font-pixel">Procesando QR...</div>
          <LoadingWaves />
          <div className="text-xs text-muted-foreground">Extrayendo monto del código QR</div>
        </div>
      </AztecBorder>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-pixel mb-2">Subir QR OXXO</h2>
        <p className="text-xs text-muted-foreground">Sube la imagen del QR que generaste en OXXO</p>
      </div>

      <AztecBorder
        variant="primary"
        className={`cursor-pointer transition-all ${dragActive ? "scale-105 border-accent" : ""}`}
      >
        <div
          className="text-center space-y-4 p-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-4xl">📱</div>
          <div className="space-y-2">
            <div className="font-pixel text-sm">Arrastra tu QR aquí</div>
            <div className="text-xs text-muted-foreground">o toca para seleccionar</div>
          </div>
          <div className="text-xs text-muted-foreground">Formatos: JPG, PNG</div>
        </div>
      </AztecBorder>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      <div className="text-center">
        <PixelButton pixelVariant="secondary" onClick={() => fileInputRef.current?.click()}>
          Seleccionar Archivo
        </PixelButton>
      </div>
    </div>
  )
}
