import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AdminProvider } from "@/contexts/AdminContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRI - Gorilla Research And Investments",
  description: "Leading infrastructure development and strategic investments across Africa",
  keywords: ["GRI", "Gorilla Research", "Investments", "Africa", "Infrastructure", "Development"],
  authors: [{ name: "GRI Team" }],
  creator: "GRI - Gorilla Research And Investments",
  publisher: "GRI - Gorilla Research And Investments",
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon', sizes: '16x16', type: 'image/x-icon' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="icon" href="/favicon" sizes="16x16" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AdminProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AdminProvider>
      </body>
    </html>
  )
}