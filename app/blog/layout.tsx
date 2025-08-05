"use client"

import { AdminProvider } from "@/contexts/AdminContext"
import { Toaster } from "@/components/ui/toaster"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      {children}
      <NewsletterSignup />
      <Toaster />
    </AdminProvider>
  )
}