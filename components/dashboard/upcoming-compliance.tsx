"use client"

import { Progress } from '@/components/ui/progress'

type ComplianceItem = {
  id: number
  title: string
  deadline: string
  daysRemaining: number
  totalDays: number
}

const complianceItems: ComplianceItem[] = [
  {
    id: 1,
    title: "Data Protection Policy Update",
    deadline: "May 15, 2025",
    daysRemaining: 12,
    totalDays: 30
  },
  {
    id: 2,
    title: "AI Registration Deadline",
    deadline: "June 1, 2025",
    daysRemaining: 28,
    totalDays: 45
  },
  {
    id: 3,
    title: "Annual Cybersecurity Audit",
    deadline: "June 15, 2025",
    daysRemaining: 42,
    totalDays: 60
  }
]

export default function UpcomingCompliance() {
  return (
    <div className="space-y-6">
      {complianceItems.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">Due: {item.deadline}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              item.daysRemaining < 15 ? 'bg-destructive/15 text-destructive' : 
              item.daysRemaining < 30 ? 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400' : 
              'bg-green-500/15 text-green-600 dark:text-green-400'
            }`}>
              {item.daysRemaining} days left
            </span>
          </div>
          
          <div className="space-y-1">
            <Progress 
              value={(item.daysRemaining / item.totalDays) * 100} 
              className={`h-2 ${
                item.daysRemaining < 15 ? 'bg-destructive/20' : 
                item.daysRemaining < 30 ? 'bg-yellow-500/20' : 
                'bg-green-500/20'
              }`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(100 - (item.daysRemaining / item.totalDays) * 100)}%</span>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <a href="#" className="text-xs text-primary hover:underline">
          View all deadlines
        </a>
      </div>
    </div>
  )
}