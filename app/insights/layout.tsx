import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Insights - GRI Africa | Market Analysis & Investment Intelligence",
  description:
    "Access GRI's expert insights on African markets, including analysis on unlocking business opportunities, blockchain technology potential, and retail strategies for challenging economies.",
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
