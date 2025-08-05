import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - GRI Africa | Our Story, Mission & Values",
  description:
    "Learn about Gorilla Research and Investments - an African investment and management consultancy specializing in scalable, technology-driven infrastructure projects across the continent.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
