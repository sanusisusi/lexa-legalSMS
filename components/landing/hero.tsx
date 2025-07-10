"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { MessageSquare, Shield, Clock, ChevronRight, AlertCircle } from 'lucide-react'

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to subscribe.",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Subscription initiated!",
      description: "You'll receive a confirmation SMS shortly.",
    })
    setPhoneNumber('')
  }

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.15] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
              Legal Updates, 
              <span className="text-primary"> Simplified</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                Delivered via SMS
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Stay informed about tech policies and legal changes through concise, AI-powered SMS alerts — tailored for tech professionals across Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
              <form onSubmit={handleSubscribe} className="flex-1 sm:max-w-md flex gap-2">
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  Subscribe <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-chart-1 mr-2" />
                <span className="text-sm">Plain Language</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-chart-2 mr-2" />
                <span className="text-sm">Compliance Focused</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-chart-3 mr-2" />
                <span className="text-sm">Real-time Updates</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-card rounded-xl overflow-hidden border shadow-xl">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center mr-3">
                      <AlertCircle className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">Lexa Alert</h3>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>NEW: AI Regulation Act</strong> requires registration of AI 
                        systems by May 15th. Simple 3-step process for compliance.
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>REMINDER:</strong> 7 days left to update your 
                        privacy policy under the new Data Protection Law.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Reply "MORE" for details or "LAWYER" to ask questions
                  </div>
                </div>
                
                <div className="border-t p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Subscribed to: AI, Privacy, Data</span>
                    <button className="text-xs text-primary">Manage</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}