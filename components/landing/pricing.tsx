'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle, ChevronRight, Shield } from 'lucide-react'

const plans = [
  {
    name: "Basic",
    description: "Essential legal alerts for startups and indie developers",
    price: "₦2,000",
    period: "monthly",
    features: [
      "5 legal topics of your choice",
      "Weekly SMS updates",
      "Basic compliance reminders",
      "Web dashboard access"
    ],
    popular: false,
    buttonText: "Start Free Trial"
  },
  {
    name: "Professional",
    description: "Comprehensive coverage for growing tech companies",
    price: "₦5,000",
    period: "monthly",
    features: [
      "All legal topics",
      "Daily SMS updates",
      "Priority compliance alerts",
      "Basic Ask-a-Lawyer (5/month)",
      "Web & Email dashboard",
      "API access"
    ],
    popular: true,
    buttonText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    description: "Full protection for established companies with complex needs",
    price: "Custom",
    period: "",
    features: [
      "All Professional features",
      "Unlimited Ask-a-Lawyer",
      "Dedicated legal analyst",
      "Custom legal monitoring",
      "Multi-user accounts",
      "Compliance workflow tools",
      "24/7 emergency support"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
]

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true)
  
  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Choose the plan that's right for your business needs
          </p>
          
          <div className="inline-flex items-center bg-muted p-1 rounded-lg border">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isMonthly ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                !isMonthly ? 'bg-background shadow-sm' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMonthly(false)}
            >
              Yearly
              <span className="ml-1 py-0.5 px-1.5 text-xs rounded-full bg-chart-1 text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${
                plan.popular 
                  ? 'border-chart-1 shadow-lg shadow-chart-1/10' 
                  : 'border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
                  <div className="bg-chart-1 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {isMonthly ? plan.price : plan.name === "Basic" ? "₦19,200" : plan.name === "Professional" ? "₦48,000" : "Custom"}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">
                      /{isMonthly ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-chart-1 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full group ${plan.popular ? 'bg-chart-1 hover:bg-chart-1/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6 gap-2">
            <Shield className="h-5 w-5 text-chart-2" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
          <p className="text-muted-foreground">
            Not sure which plan is right for you? Start with a 14-day free trial on any plan.
            Cancel anytime during your trial and you won't be charged.
          </p>
        </div>
      </div>
    </section>
  )
}