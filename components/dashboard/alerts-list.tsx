"use client"

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, FileText, AlertTriangle } from 'lucide-react'

const alerts = [
  {
    id: 1,
    title: "New Data Protection Regulation",
    description: "The new Data Protection Act now requires explicit consent for all data collection. Update your policies by June 15.",
    date: "May 2, 2025",
    type: "regulatory",
    priority: "high"
  },
  {
    id: 2,
    title: "AI Licensing Requirements",
    description: "New rules require registration of AI systems used in financial services. 30-day compliance window begins today.",
    date: "April 28, 2025",
    type: "compliance",
    priority: "high"
  },
  {
    id: 3,
    title: "Cybersecurity Directive Update",
    description: "Security standards for cloud services have been updated. Review changes to ensure your systems comply.",
    date: "April 25, 2025",
    type: "regulatory",
    priority: "medium"
  },
  {
    id: 4,
    title: "Open Source Licensing Change",
    description: "Important changes to the licensing terms for common open source libraries. Check if your products are affected.",
    date: "April 20, 2025",
    type: "informational",
    priority: "low"
  },
  {
    id: 5,
    title: "Digital Tax Filing Deadline",
    description: "Reminder: tech company digital service tax filings due in 10 days. Late submissions incur 10% penalty.",
    date: "April 15, 2025",
    type: "deadline",
    priority: "medium"
  }
]

export default function AlertsList() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {alert.priority === "high" ? (
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              ) : alert.type === "regulatory" || alert.type === "compliance" ? (
                <div className="w-8 h-8 rounded-full bg-chart-1/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-chart-1" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-chart-2" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{alert.title}</h3>
                <Badge 
                  variant={
                    alert.priority === "high" ? "destructive" :
                    alert.priority === "medium" ? "outline" : "secondary"
                  }
                  className="text-xs"
                >
                  {alert.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{alert.date}</span>
                <button className="text-xs text-primary hover:underline">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}