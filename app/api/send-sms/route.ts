import { NextResponse } from 'next/server'
import AfricasTalking from 'africastalking'
import { messageStore } from '@/lib/message-store'

// Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
})

export async function POST(req: Request) {
  try {
    const { recipients, message } = await req.json()
    
    // Split recipients string into array and clean phone numbers
    const phoneNumbers = recipients
      .split(',')
      .map((num: string) => num.trim())
      .filter((num: string) => num.length > 0)
    
    if (phoneNumbers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid phone numbers provided' },
        { status: 400 }
      )
    }
    
    // Send SMS using Africa's Talking
    const result = await africastalking.SMS.send({
      to: phoneNumbers,
      message: message,
      from: process.env.SENDER_ID,
    })

    // Store message in memory for each recipient
    phoneNumbers.forEach(phone => {
      const messageId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      messageStore.addMessage({
        id: messageId,
        to: phone,
        message: message,
        status: 'sent',
        type: 'sent',
        timestamp: new Date().toISOString(),
        senderId: process.env.SENDER_ID || 'LEXA'
      })
    })
    
    return NextResponse.json({ 
      success: true, 
      result,
      messageCount: phoneNumbers.length 
    })
  } catch (error) {
    console.error('SMS sending failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send SMS' },
      { status: 500 }
    )
  }
}