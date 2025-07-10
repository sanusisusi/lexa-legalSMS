"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import DashboardSidebar from '@/components/dashboard/sidebar'
import DashboardHeader from '@/components/dashboard/header'
import AlertsList from '@/components/dashboard/alerts-list'
import TopicsManager from '@/components/dashboard/topics-manager'
import UpcomingCompliance from '@/components/dashboard/upcoming-compliance'
import AlertsChart from '@/components/dashboard/alerts-chart'

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-semibold mb-2 sm:mb-0">Dashboard</h1>
              <Button>
                Manage SMS Preferences
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active Topics</CardTitle>
                  <CardDescription>Legal areas you're monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="#" className="text-xs text-primary hover:underline">View all topics</Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Alerts This Month</CardTitle>
                  <CardDescription>SMS notifications sent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">23</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="#" className="text-xs text-primary hover:underline">View all alerts</Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Ask a Lawyer</CardTitle>
                  <CardDescription>Questions remaining</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3/5</div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="#" className="text-xs text-primary hover:underline">Upgrade plan</Link>
                </CardFooter>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Alert Activity</CardTitle>
                  <CardDescription>SMS alerts sent over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertsChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Compliance</CardTitle>
                  <CardDescription>Deadlines to prepare for</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingCompliance />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Tabs defaultValue="recent-alerts" className="w-full">
                <TabsList className="grid w-full md:w-auto grid-cols-2">
                  <TabsTrigger value="recent-alerts">Recent Alerts</TabsTrigger>
                  <TabsTrigger value="my-topics">My Topics</TabsTrigger>
                </TabsList>
                <TabsContent value="recent-alerts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Alerts</CardTitle>
                      <CardDescription>SMS updates sent to your phone</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AlertsList />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="my-topics">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Topics</CardTitle>
                      <CardDescription>Legal areas you're monitoring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TopicsManager />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}