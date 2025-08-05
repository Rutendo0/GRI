
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Here you would integrate with your email service (SendGrid, Nodemailer, etc.)
    // For now, we'll log the email signup
    console.log(`Newsletter signup: ${email} - Forward to info@niakazi`)
    
    // In a real implementation, you would:
    // 1. Send an email to info@niakazi with the new subscriber details
    // 2. Add the email to your mailing list
    // 3. Send a confirmation email to the subscriber
    
    // Example email content that would be sent to info@niakazi:
    const emailContent = {
      to: 'info@niakazi',
      subject: 'New Newsletter Signup - GRI Blog',
      body: `
        New newsletter subscription received:
        
        Email: ${email}
        Timestamp: ${new Date().toISOString()}
        Source: GRI Blog Newsletter Popup
        
        Please add this email to the newsletter mailing list.
      `
    }
    
    console.log('Email to be sent:', emailContent)

    return NextResponse.json({ 
      success: true, 
      message: 'Newsletter signup successful' 
    })
    
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
