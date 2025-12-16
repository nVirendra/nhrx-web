"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@components/ui/card";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {Button } from "@components/ui/button";
import { Users, CalendarDays, Briefcase, Bell, ArrowRight, Activity, Clock, UserCheck } from "lucide-react";

export default function Dashboard() {
  // Your exact original data
  const announcements = [
    "HRMS v2.0 launching next week!",
    "Salary will be processed on 28th.",
    "New leave policy is now live.",
  ];

  const stats = [
    {
      title: "Total Employees",
      value: "128",
      details: "10 new employees joined this month",
      icon: Users,
      color: "bg-primary/15 text-primary",
    },
    {
      title: "Today's Present",
      value: "102",
      details: "Attendance is 82% today",
      icon: CalendarDays,
      color: "bg-green-500/15 text-green-600",
    },
    {
      title: "On Leave",
      value: "08",
      details: "4 sick leave, 2 casual, 2 earned leave",
      icon: Briefcase,
      color: "bg-yellow-500/15 text-yellow-600",
    },
  ];

  const attendanceTrend = [
    { day: "Mon", present: 95, absent: 5 },
    { day: "Tue", present: 100, absent: 2 },
    { day: "Wed", present: 90, absent: 10 },
    { day: "Thu", present: 110, absent: 3 },
    { day: "Fri", present: 98, absent: 7 },
  ];

  const departmentData = [
    { key: "dev", label: "Development", value: 45 },
    { key: "hr", label: "HR", value: 20 },
    { key: "sales", label: "Sales", value: 35 },
  ];

  // Recent Activity data
  const recentActivities = [
    { user: "Sarah Johnson", action: "Leave approved", time: "2 min ago", type: "success" },
    { user: "Mike Chen", action: "Onboarding completed", time: "15 min ago", type: "info" },
    { user: "Lisa Rodriguez", action: "Resignation submitted", time: "1 hr ago", type: "warning" },
    { user: "David Kim", action: "Performance review scheduled", time: "3 hrs ago", type: "info" },
  ];

  return (
    <div className="space-y-8">
      {/* -------------------- STATS CARDS -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <Card className="p-6 cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="flex flex-row items-center justify-between p-0">
                  <CardTitle className="text-sm text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-3xl font-semibold">{item.value}</p>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">{item.details}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      {/* -------------------- ATTENDANCE CHART + PIE CHART -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <Card className="lg:col-span-2 p-6">
          <CardTitle className="text-lg font-semibold mb-6">Attendance Trend</CardTitle>
          <ChartContainer
            id="attendance-trend"
            config={{
              present: { label: "Present", color: "#10b981" },
              absent: { label: "Absent", color: "#ef4444" },
            }}
            className="h-72 mt-6"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="var(--color-present)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="var(--color-absent)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Department Pie Chart */}
        <Card className="p-6">
          <CardTitle className="text-lg font-semibold mb-6">Employees by Department</CardTitle>
          <ChartContainer
            id="dept-chart"
            className="h-72 mt-6"
            config={{
              dev: { label: "Development", color: "#3b82f6" },
              hr: { label: "HR", color: "#10b981" },
              sales: { label: "Sales", color: "#f59e0b" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={40}
                  paddingAngle={3}
                >
                  {departmentData.map((item, idx) => (
                    <Cell key={`cell-${idx}`} fill={`var(--color-${item.key})`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideIndicator={false} />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>

      {/* -------------------- QUICK LINKS + RECENT ACTIVITY -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Links */}
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Add Employee", icon: Users, link: "/employees/new" },
                { label: "Attendance", icon: CalendarDays, link: "/attendance/daily" },
                { label: "Leaves", icon: Briefcase, link: "/leaves/requests" },
                { label: "Announcements", icon: Bell, link: "/announcements" },
              ].map((q, i) => (
                <Card
                  key={i}
                  className="p-5 flex items-center gap-4 hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <q.icon className="w-6 h-6 text-primary" />
                  <span className="font-medium">{q.label}</span>
                  <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground" />
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-all duration-200 group">
                <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-primary'
                } group-hover:scale-110 transition-transform`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground group-hover:text-primary">
                    {activity.user}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                  {activity.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* -------------------- ANNOUNCEMENTS CAROUSEL -------------------- */}
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="text-lg font-semibold">Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {announcements.map((note, index) => (
                <CarouselItem key={index}>
                  <div className="p-6 rounded-xl bg-secondary/40 hover:bg-secondary text-foreground shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-primary/30">
                    {note}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
