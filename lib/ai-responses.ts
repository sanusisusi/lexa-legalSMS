type Topic = 'data-protection' | 'ai-regulation' | 'cybersecurity' | 'fintech' | 'intellectual-property' | 'legal-advice'

interface Response {
  topic: Topic
  keywords: string[]
  response: string
}

const responses: Response[] = [
  {
    topic: 'data-protection',
    keywords: ['privacy', 'data', 'gdpr', 'personal information', 'consent'],
    response: `Here are the key data protection requirements:
1. Obtain explicit user consent
2. Document data processing activities
3. Implement security measures
4. Appoint a Data Protection Officer
5. Report breaches within 72 hours`
  },
  {
    topic: 'ai-regulation',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'algorithm', 'automated'],
    response: `AI Registration Process:
1. System Documentation: Prepare AI system details
2. Risk Assessment: Evaluate potential impacts
3. Submit via tech.gov portal
4. Pay registration fee
5. Implement monitoring systems`
  },
  {
    topic: 'cybersecurity',
    keywords: ['security', 'cyber', 'hack', 'breach', 'protection'],
    response: `Cybersecurity Compliance Steps:
1. Regular security audits
2. Employee training programs
3. Incident response plan
4. Data encryption
5. Access control implementation`
  },
  {
    topic: 'fintech',
    keywords: ['payment', 'financial', 'banking', 'transaction', 'money'],
    response: `FinTech Compliance Requirements:
1. Obtain necessary licenses
2. Implement KYC procedures
3. Transaction monitoring
4. Regular financial audits
5. Consumer protection measures`
  },
  {
    topic: 'intellectual-property',
    keywords: ['patent', 'copyright', 'trademark', 'ip', 'intellectual'],
    response: `IP Protection Guidelines:
1. Register your trademarks
2. Document innovations
3. Use proper IP notices
4. Monitor for infringement
5. Maintain confidentiality`
  },
  {
    topic: 'legal-advice',
    keywords: ['advice', 'legal', 'lawyer', 'counsel', 'attorney', 'advise'],
    response: `Based on your query, here's my legal analysis:

1. Initial Assessment:
   - Reviewing applicable laws and regulations
   - Identifying key legal considerations
   - Analyzing potential risks

2. Recommendations:
   - Document all relevant interactions
   - Maintain clear communication records
   - Consider seeking specialized counsel

3. Next Steps:
   - Review provided guidance
   - Implement suggested measures
   - Schedule follow-up if needed

Note: This is general information and not a substitute for professional legal counsel.`
  }
]

export function generateResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase()
  
  // Check for AI Legal Advisor specific commands
  if (lowercaseMessage.includes('advice') || lowercaseMessage.includes('legal help')) {
    return `Welcome to Lexa's AI Legal Advisor! How can I help you today?

Available commands:
- ANALYZE [situation]: Get legal analysis
- RIGHTS: Learn about your legal rights
- COMPLY: Get compliance guidance
- LAWYER: Connect with a human lawyer`
  }

  if (lowercaseMessage.includes('analyze')) {
    const situation = message.replace(/analyze/i, '').trim()
    return responses.find(r => r.topic === 'legal-advice')?.response || 
           'Please provide more details about your legal situation for analysis.'
  }

  // Check for specific commands
  if (lowercaseMessage.includes('more')) {
    for (const response of responses) {
      if (response.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return response.response
      }
    }
  }
  
  if (lowercaseMessage.includes('lawyer')) {
    return `Our legal team will review your query and respond within 24 hours. For urgent matters, please call our hotline at +1234567890.

Available times for consultation:
- Mon-Fri: 9am - 5pm
- Sat: 10am - 2pm`
  }
  
  if (lowercaseMessage.includes('help')) {
    return `Available commands:
- MORE [topic]: Get detailed information
- ANALYZE [situation]: Get AI legal analysis
- LAWYER: Request legal consultation
- HELP: Show this menu
- STATUS: Check compliance status`
  }
  
  if (lowercaseMessage.includes('status')) {
    return `Your compliance status:
✅ Data Protection: Up to date
⚠️ AI Registration: Due in 15 days
✅ Cybersecurity: Certified
🔄 Annual Review: Pending`
  }
  
  // Default response
  return `Thank you for your message. For legal assistance, try:
- Type ADVICE for AI legal analysis
- Type ANALYZE followed by your situation
- Type LAWYER to consult an expert
- Type HELP for all commands`
}