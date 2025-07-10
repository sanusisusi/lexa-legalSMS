"use client"

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does Lexa source its legal information?",
    answer: "We use a combination of web scraping technology and partnerships with legal experts to monitor official government sites, legal databases, and policy announcements across African countries. Our AI system filters and processes this information to identify relevant updates for tech professionals."
  },
  {
    question: "What regions does Lexa currently cover?",
    answer: "Lexa currently covers major tech hubs in Africa, including Nigeria, Kenya, South Africa, Ghana, Egypt, Rwanda, and Tunisia. We're rapidly expanding to cover more countries and regions based on user demand."
  },
  {
    question: "How accurate are the legal summaries?",
    answer: "All our AI-generated summaries undergo review by qualified legal professionals before being sent to ensure accuracy. We prioritize factual correctness while making the information accessible and actionable for non-legal professionals."
  },
  {
    question: "Can I customize which updates I receive?",
    answer: "Absolutely! During signup, you'll select topic areas relevant to your business (e.g., data protection, AI regulation, cybersecurity). You can update these preferences at any time from your dashboard or via SMS commands."
  },
  {
    question: "What is the 'Ask a Lawyer' feature?",
    answer: "Ask a Lawyer allows you to text specific legal questions related to tech regulation. Our AI provides initial responses based on current laws, with complex questions being reviewed by qualified legal professionals. This helps you get quick guidance without the expense of a full legal consultation."
  },
  {
    question: "Will Lexa replace my legal counsel?",
    answer: "No. Lexa provides awareness and educational information about legal changes but does not provide personalized legal advice. We recommend working with qualified legal counsel for specific situations and compliance implementations."
  },
  {
    question: "How many SMS alerts will I receive?",
    answer: "This varies based on your subscription tier and selected topics. Basic plans receive weekly digests, while Professional plans can receive daily updates when relevant. You can always adjust frequency preferences in your account settings."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes. We adhere to strict data protection standards, only collecting information necessary to provide our service. Your phone number and preference data are encrypted and never shared with third parties without your explicit consent."
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Lexa
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <div className="inline-flex gap-4">
            <a 
              href="#contact" 
              className="inline-flex items-center text-primary hover:underline"
            >
              Contact Support
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="/documentation" 
              className="inline-flex items-center text-primary hover:underline"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}