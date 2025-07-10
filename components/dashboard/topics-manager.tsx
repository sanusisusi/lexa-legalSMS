"use client"

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings, Plus } from 'lucide-react'

type Topic = {
  id: string
  name: string
  description: string
  selected: boolean
  available: boolean
}

export default function TopicsManager() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "data-protection",
      name: "Data Protection",
      description: "Privacy laws, data security regulations, and cross-border data transfer rules",
      selected: true,
      available: true
    },
    {
      id: "ai-regulation",
      name: "AI Regulation",
      description: "Artificial intelligence governance, algorithmic accountability, and ethical AI laws",
      selected: true,
      available: true
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      description: "Network security requirements, breach notification rules, and security standards",
      selected: true,
      available: true
    },
    {
      id: "fintech",
      name: "FinTech Compliance",
      description: "Digital banking regulations, payment processing rules, and financial inclusion policies",
      selected: false,
      available: true
    },
    {
      id: "intellectual-property",
      name: "Intellectual Property",
      description: "Patent, trademark, and copyright laws affecting technology innovation",
      selected: true,
      available: true
    },
    {
      id: "digital-taxation",
      name: "Digital Taxation",
      description: "Tax policies for digital services, e-commerce, and international tech companies",
      selected: true,
      available: true
    },
    {
      id: "telecom",
      name: "Telecom Regulation",
      description: "Spectrum allocation, telecom licensing, and infrastructure sharing rules",
      selected: false,
      available: true
    },
    {
      id: "competition",
      name: "Competition Law",
      description: "Antitrust regulations, market dominance restrictions, and merger controls",
      selected: false,
      available: false
    },
    {
      id: "content",
      name: "Content Regulation",
      description: "Online content moderation rules, platform liability, and content standards",
      selected: false,
      available: false
    }
  ])

  const handleTopicChange = (id: string, checked: boolean) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, selected: checked } : topic
    ))
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Select the legal topics you want to receive SMS alerts about
        </p>
        <Button variant="outline" size="sm" className="ml-2">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className={`p-4 border rounded-lg ${!topic.available ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start">
                <Checkbox 
                  id={topic.id}
                  checked={topic.selected}
                  onCheckedChange={(checked) => handleTopicChange(topic.id, !!checked)}
                  disabled={!topic.available}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={topic.id}
                    className="font-medium cursor-pointer"
                  >
                    {topic.name}
                    {!topic.available && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (Premium Plan Only)
                      </span>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 border border-dashed rounded-lg">
            <Button variant="ghost" className="w-full flex items-center justify-center text-muted-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Request New Topic
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}