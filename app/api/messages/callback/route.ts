import { NextResponse } from 'next/server'
import { messageStore } from '@/lib/message-store'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Add message to store
    messageStore.addMessage({
      id: data.messageId || Date.now().toString(),
      to: data.recipient,
      message: data.message,
      status: data.status || 'sent',
      type: 'sent',
      timestamp: new Date().toISOString(),
      senderId: process.env.SENDER_ID || 'LEXA'
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Message callback processing failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process message callback' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const messages = messageStore.getMessages()
    return NextResponse.json({ success: true, messages })
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}