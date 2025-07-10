import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, ShieldAlert, Smartphone, BrainCircuit, Clock, MessageSquare, Globe, LineChart } from "lucide-react"

const features = [
  {
    icon: <Scale className="h-10 w-10 text-chart-1" />,
    title: "Legal Monitoring",
    description: "Continuous monitoring of legal changes affecting tech companies across multiple African jurisdictions."
  },
  {
    icon: <ShieldAlert className="h-10 w-10 text-chart-2" />,
    title: "Compliance Alerts",
    description: "Receive timely reminders about upcoming compliance deadlines and regulatory changes."
  },
  {
    icon: <Smartphone className="h-10 w-10 text-chart-3" />,
    title: "SMS Accessibility",
    description: "All alerts delivered via SMS, ensuring you stay informed even without reliable internet access."
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-chart-4" />,
    title: "AI-Powered Summaries",
    description: "Complex legal language converted to plain, actionable summaries you can understand immediately."
  },
  {
    icon: <Clock className="h-10 w-10 text-chart-5" />,
    title: "Real-time Updates",
    description: "Be the first to know about critical changes that could affect your business or projects."
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-chart-1" />,
    title: "Ask a Lawyer",
    description: "Text your legal questions directly and receive expert-vetted answers tailored to your situation."
  },
  {
    icon: <Globe className="h-10 w-10 text-chart-2" />,
    title: "Pan-African Coverage",
    description: "Comprehensive coverage across major African tech hubs, with localized legal insights."
  },
  {
    icon: <LineChart className="h-10 w-10 text-chart-3" />,
    title: "Personalized Insights",
    description: "Alerts tailored to your specific industry, tech stack, and business model."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solving Legal Complexity for Tech Professionals
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered platform monitors, filters, and delivers only the legal updates that matter to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}