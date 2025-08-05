import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - GRI Africa | Get in Touch",
  description:
    "Contact Gorilla Research and Investments for partnership opportunities, investment inquiries, and consultancy services across Africa. Headquarters in Harare, Zimbabwe.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
