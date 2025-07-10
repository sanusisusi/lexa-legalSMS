import { NextResponse } from 'next/server'
import AfricasTalking from 'africastalking'
import { generateResponse } from '@/lib/ai-responses'
import { messageStore } from '@/lib/message-store'

const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
})

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { from, text, date } = data
    
    // Store incoming message
    const incomingMessageId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    messageStore.addMessage({
      id: incomingMessageId,
      to: from,
      message: text,
      status: 'delivered',
      type: 'received',
      timestamp: date || new Date().toISOString(),
      senderId: from
    })
    
    // Generate AI response based on message content
    let response = generateResponse(text)
    
    // Add AI Legal Advisor context if needed
    if (text.toLowerCase().includes('advice') || text.toLowerCase().includes('analyze')) {
      response = `🤖 AI Legal Advisor:\n\n${response}\n\nDisclaimer: This is AI-generated guidance and should not replace professional legal counsel.`
    }
    
    // Send response if generated
    if (response) {
      await africastalking.SMS.send({
        to: from,
        message: response,
        from: process.env.SENDER_ID,
      })

      // Store outgoing message
      const outgoingMessageId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      messageStore.addMessage({
        id: outgoingMessageId,
        to: from,
        message: response,
        status: 'sent',
        type: 'sent',
        timestamp: new Date().toISOString(),
        senderId: process.env.SENDER_ID || 'LEXA'
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}