import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spendrillions - Spend Your Million",
  description: "The most chaotic shopping simulator ever created",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://synchronicity-avento-bot.vercel.app/sdk.js"
          data-key="pk_f74323227dbb03ce11e90e3e0e7e7ff83f91bce2cb10aa76"
          async
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
