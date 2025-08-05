import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - GRI Africa | Strategic Consultancy & Investment Solutions",
  description:
    "Explore GRI's comprehensive suite of services including Strategic Consultancy, Project Management, Innovation Strategy, and Foreign Direct Investment Facilitation across Africa.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
