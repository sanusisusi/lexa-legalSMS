"use client"

import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const data = [
  { name: 'Week 1', privacy: 4, ai: 2, cyber: 1, tax: 0, ip: 1 },
  { name: 'Week 2', privacy: 3, ai: 1, cyber: 2, tax: 1, ip: 0 },
  { name: 'Week 3', privacy: 5, ai: 3, cyber: 1, tax: 0, ip: 2 },
  { name: 'Week 4', privacy: 2, ai: 4, cyber: 3, tax: 1, ip: 1 },
  { name: 'Week 5', privacy: 4, ai: 3, cyber: 2, tax: 2, ip: 0 },
  { name: 'Week 6', privacy: 6, ai: 2, cyber: 1, tax: 0, ip: 1 },
  { name: 'Week 7', privacy: 3, ai: 4, cyber: 2, tax: 1, ip: 2 },
  { name: 'Week 8', privacy: 5, ai: 2, cyber: 3, tax: 0, ip: 1 },
]

export default function AlertsChart() {
  const [timeRange, setTimeRange] = useState('2m')
  
  return (
    <div className="h-80">
      <div className="flex items-center justify-end mb-4 space-x-1">
        <Button 
          variant={timeRange === '2w' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setTimeRange('2w')}
          className="text-xs h-7"
        >
          2w
        </Button>
        <Button 
          variant={timeRange === '1m' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setTimeRange('1m')}
          className="text-xs h-7"
        >
          1m
        </Button>
        <Button 
          variant={timeRange === '2m' ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => setTimeRange('2m')}
          className="text-xs h-7"
        >
          2m
        </Button>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--muted-foreground)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--muted-foreground)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              color: 'var(--foreground)'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="privacy" 
            stackId="1"
            stroke="hsl(var(--chart-1))" 
            fill="hsla(var(--chart-1), 0.5)" 
            name="Data Privacy"
          />
          <Area 
            type="monotone" 
            dataKey="ai" 
            stackId="1"
            stroke="hsl(var(--chart-2))" 
            fill="hsla(var(--chart-2), 0.5)" 
            name="AI Regulation"
          />
          <Area 
            type="monotone" 
            dataKey="cyber" 
            stackId="1"
            stroke="hsl(var(--chart-3))" 
            fill="hsla(var(--chart-3), 0.5)" 
            name="Cybersecurity"
          />
          <Area 
            type="monotone" 
            dataKey="tax" 
            stackId="1"
            stroke="hsl(var(--chart-4))" 
            fill="hsla(var(--chart-4), 0.5)" 
            name="Digital Tax"
          />
          <Area 
            type="monotone" 
            dataKey="ip" 
            stackId="1"
            stroke="hsl(var(--chart-5))" 
            fill="hsla(var(--chart-5), 0.5)" 
            name="IP Law"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}