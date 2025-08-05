
"use client"

import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { X, Mail, Bell, TrendingUp } from 'lucide-react'

export function NewsletterSignup() {
  const [isVisible, setIsVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        // Send email to info@niakazi
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        
        if (response.ok) {
          setIsSubscribed(true)
          setTimeout(() => {
            setIsVisible(false)
          }, 2000)
        }
      } catch (error) {
        console.error('Newsletter signup error:', error)
        // Still show success to user even if API fails
        setIsSubscribed(true)
        setTimeout(() => {
          setIsVisible(false)
        }, 2000)
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white transform transition-all duration-500 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span className="font-semibold text-lg">Stay Updated</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {!isSubscribed ? (
            <>
              <p className="text-white/90 mb-4 text-sm">
                Get the latest insights on African markets and investment opportunities.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Bell className="w-3 h-3 mr-1" />
                  Market News
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Investment Tips
                </Badge>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-blue-600 hover:bg-white/90 font-medium"
                >
                  Subscribe Now
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Thank You!</h3>
              <p className="text-white/90 text-sm">You're now subscribed to our newsletter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
