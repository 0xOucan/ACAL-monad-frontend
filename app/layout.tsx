import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Press_Start_2P } from "next/font/google"
import { WalletProvider } from "@/hooks/use-wallet"
import { PageTransition } from "@/components/ui/page-transition"
import "./globals.css"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: "ACAL - Tu canoa a Monad",
  description: "Tu canoa digital: de pesos mexicanos directo a Monad, en pocos clics y sin complicaciones.",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#002147",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ACAL",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-MX">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-pixel: ${pressStart2P.variable};
}
        `}</style>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ACAL" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${pressStart2P.variable}`}>
        <WalletProvider>
          <PageTransition>{children}</PageTransition>
        </WalletProvider>
      </body>
    </html>
  )
}
