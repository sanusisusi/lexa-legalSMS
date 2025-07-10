"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send, Users, History, Phone, Clock, AlertCircle } from 'lucide-react'
import { StoredMessage } from '@/lib/message-store'

const formSchema = z.object({
  recipients: z.string().min(1, {
    message: "Recipients are required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }).max(160, {
    message: "Message must not exceed 160 characters.",
  }),
})

export default function MessagesPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<StoredMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchMessages()
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages/callback')
      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipients: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const recipientCount = values.recipients.split(',').length
      toast({
        title: "Message sent successfully",
        description: `Sent to ${recipientCount} recipients`,
      })

      form.reset()
      fetchMessages() // Refresh messages list
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMessageTypeStyle = (type: string) => {
    switch (type) {
      case 'sent':
        return 'bg-primary/20 text-primary'
      case 'received':
        return 'bg-secondary/20 text-secondary'
      case 'campaign':
        return 'bg-chart-2/20 text-chart-2'
      case 'legal-advice':
        return 'bg-chart-3/20 text-chart-3'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="container mx-auto p-6 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Lexa Message Center</h1>
          <p className="text-muted-foreground">Manage SMS communications</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hover-card-effect">
            <Users className="mr-2 h-4 w-4" />
            Recipients
          </Button>
          <Button variant="outline" className="hover-card-effect">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover-card-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send Message
            </CardTitle>
            <CardDescription>
              Send SMS alerts to subscribers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipients</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="+254700000000, +254711111111" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter phone numbers separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..." 
                          className="h-32 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="flex justify-between">
                        <span>SMS message</span>
                        <span className={`font-medium ${
                          (field.value?.length || 0) > 140 ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {160 - (field.value?.length || 0)} characters remaining
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full gradient-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="hover-card-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Message History
            </CardTitle>
            <CardDescription>
              Recent messages and responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No messages yet
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border ${
                        message.type === 'sent' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full ${getMessageTypeStyle(message.type)}`}>
                            {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                          </span>
                          <span className="text-muted-foreground">{message.to}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(message.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}