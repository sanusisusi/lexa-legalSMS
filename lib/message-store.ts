type MessageStatus = 'sent' | 'delivered' | 'failed'
type MessageType = 'sent' | 'received' | 'notification' | 'campaign' | 'legal-advice'

export interface StoredMessage {
  id: string
  to: string
  message: string
  status: MessageStatus
  type: MessageType
  timestamp: string
  senderId: string
}

// In-memory message store
class MessageStore {
  private messages: StoredMessage[] = []

  addMessage(message: StoredMessage) {
    this.messages.unshift(message) // Add to beginning for newest first
  }

  getMessages() {
    return [...this.messages]
  }

  getMessagesByRecipient(recipient: string) {
    return this.messages.filter(m => m.to === recipient)
  }

  updateMessageStatus(id: string, status: MessageStatus) {
    const message = this.messages.find(m => m.id === id)
    if (message) {
      message.status = status
    }
  }

  // Get conversation history for a specific number
  getConversation(phoneNumber: string) {
    return this.messages.filter(m => 
      m.to === phoneNumber || 
      (m.type === 'received' && m.senderId === phoneNumber)
    ).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }
}

// Singleton instance
export const messageStore = new MessageStore()