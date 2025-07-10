import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Smartphone, BrainCircuit, MessageSquare, Phone } from 'lucide-react'

const steps = [
  {
    number: "01",
    title: "Choose Your Channel",
    description: "Subscribe via SMS, sign up on our website, or simply call our number to start getting legal assistance."
  },
  {
    number: "02",
    title: "We Monitor Legal Changes",
    description: "Our system constantly scans government sites, legal databases, and policy announcements across African countries."
  },
  {
    number: "03",
    title: "AI Analyzes & Simplifies",
    description: "Our AI engine processes both text and voice inputs, translating complex legal information into clear, actionable guidance."
  },
  {
    number: "04",
    title: "Get Instant Assistance",
    description: "Receive SMS alerts, voice responses, or connect with lawyers directly - all designed to provide quick, accessible legal guidance."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Lexa Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined process ensures you stay informed through your preferred communication channel.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Button size="lg" className="group">
                Start Your Free Trial
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                  →
                </span>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-chart-2 to-chart-3 rounded-2xl blur-lg opacity-75"></div>
              <Card className="relative border bg-card shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 bg-primary text-primary-foreground">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Lexa Service</h3>
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Your legal assistance dashboard</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-start gap-3">
                      <BrainCircuit className="h-6 w-6 text-chart-1 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">AI Analysis</h4>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-chart-1 h-full rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Smartphone className="h-6 w-6 text-chart-2 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">SMS Delivery</h4>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-chart-2 h-full rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-6 w-6 text-chart-3 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Voice Assistant</h4>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div className="bg-chart-3 h-full rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-chart-1 mr-2" />
                        <span className="text-sm">Voice Legal Queries</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-chart-1 mr-2" />
                        <span className="text-sm">SMS Updates</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-chart-1 mr-2" />
                        <span className="text-sm">Lawyer Connection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Active Channels: Voice & SMS
                      </span>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}