"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AlertCircle, LayoutDashboard, Bell, Settings, MessageSquare, FileText, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Alerts',
    href: '/dashboard/alerts',
    icon: Bell,
  },
  {
    name: 'Topics',
    href: '/dashboard/topics',
    icon: FileText,
  },
  {
    name: 'Ask a Lawyer',
    href: '/dashboard/ask',
    icon: MessageSquare,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    name: 'Help',
    href: '/dashboard/help',
    icon: HelpCircle,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <aside
      className={cn(
        "bg-card border-r transition-all duration-300 hidden md:flex md:flex-col",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <AlertCircle className="h-6 w-6 text-primary flex-shrink-0" />
          {!isCollapsed && <span className="font-bold text-xl">Lexa</span>}
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col justify-between">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 rounded-md text-sm font-medium",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div>
          <div className={cn(
            "p-4 bg-muted rounded-lg mb-4",
            isCollapsed && "p-2"
          )}>
            {!isCollapsed && (
              <>
                <h4 className="font-medium text-sm mb-1">Plan: Professional</h4>
                <p className="text-xs text-muted-foreground mb-3">Renewal in 14 days</p>
              </>
            )}
            <Button
              variant="outline"
              size={isCollapsed ? "icon" : "sm"}
              className="w-full"
            >
              {isCollapsed ? <Settings className="h-4 w-4" /> : "Manage Plan"}
            </Button>
          </div>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-20 -right-4 h-8 w-8 rounded-full border shadow-md bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  )
}