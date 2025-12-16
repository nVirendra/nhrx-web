import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import {
  Building2,
  Users,
  Calendar,
  Clock,
  Mail,
  Smartphone,
  FileText,
  BadgePercent,
  Settings,
  Bell,
  Shield,
  Database,
  Globe,
  Upload,
  Eye,
  Save,
  Info,
  AlertTriangle,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Alert, AlertDescription } from "../../components/ui/alert";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HRMS System Settings</h1>
          <p className="text-muted-foreground">
            Configure your Human Resource Management System
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* ● GENERAL SETTINGS */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General System Settings</CardTitle>
              <CardDescription>
                Basic HRMS configuration options
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>System Name *</Label>
                  <Input placeholder="HRMS Suite" defaultValue="HRMS Pro" />
                </div>

                <div className="space-y-2">
                  <Label>Admin Email *</Label>
                  <Input type="email" placeholder="admin@company.com" />
                </div>

                <div className="space-y-2">
                  <Label>Default Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="ist">IST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict login access to admins only
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed error logging
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● COMPANY SETTINGS */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input placeholder="Company Name" />
              </div>

              <div className="space-y-2">
                <Label>Company Description</Label>
                <Textarea placeholder="About your company..." rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex gap-2">
                    <Input type="file" />
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>HR Contact Email</Label>
                  <Input placeholder="hr@company.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Street Address" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="ZIP" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● ATTENDANCE SETTINGS */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Attendance Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Work Start Time</Label>
                  <Input type="time" defaultValue="09:00" />
                </div>

                <div className="space-y-2">
                  <Label>Work End Time</Label>
                  <Input type="time" defaultValue="18:00" />
                </div>

                <div className="space-y-2">
                  <Label>Half-Day Time</Label>
                  <Input type="time" defaultValue="13:00" />
                </div>

                <div className="space-y-2">
                  <Label>Late Mark (Minutes)</Label>
                  <Input type="number" defaultValue="10" />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <div>
                    <Label>Enable Biometric Attendance</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync attendance from biometric device
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <div>
                    <Label>Allow Remote Attendance</Label>
                    <p className="text-sm text-muted-foreground">
                      Employees can mark attendance with GPS
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● LEAVE SETTINGS */}
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Leave Management
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Annual Leave Days</Label>
                <Input type="number" defaultValue="18" />
              </div>

              <div className="space-y-2">
                <Label>Sick Leave Days</Label>
                <Input type="number" defaultValue="10" />
              </div>

              <div className="space-y-2">
                <Label>Carry-Forward Limit</Label>
                <Input type="number" defaultValue="5" />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label>Leave Approval Required</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label>Auto Approve Under X Days</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● PAYROLL SETTINGS */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgePercent className="h-5 w-5" />
                Payroll Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Salary Process Date</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(28)].map((_, i) => (
                        <SelectItem key={i} value={`${i + 1}`}>
                          {i + 1}
                        </SelectItem>
                      ))}
                      <SelectItem value="last">Last Day of Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Overtime Rate (% of basic)</Label>
                  <Input type="number" defaultValue="150" />
                </div>

                <div>
                  <Label>Tax Deduction Enabled</Label>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Payslip Footer</Label>
                <Textarea placeholder="Thank you for your service..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● RECRUITMENT SETTINGS */}
        <TabsContent value="recruitment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recruitment & Hiring
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Enable Job Portal</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Auto Email to Shortlisted Candidates</Label>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Interview Reminders</Label>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Default Interview Duration (minutes)</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● EMAIL SETTINGS */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="SMTP Host" />
                <Input placeholder="SMTP Port" />
                <Input placeholder="Username" />
                <Input type="password" placeholder="Password" />
              </div>

              <Separator />

              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● SMS SETTINGS */}
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                SMS Gateway
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Select defaultValue="twilio">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="nexmo">Nexmo</SelectItem>
                  <SelectItem value="aws">AWS SNS</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="API Key" />
                <Input placeholder="API Secret" />
              </div>

              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Test SMS
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● NOTIFICATIONS */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {[
                { label: "New Employee Added" },
                { label: "Leave Request Submitted" },
                { label: "Overtime Request" },
                { label: "Payslip Generated" },
                { label: "Interview Scheduled" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 border rounded-xl"
                >
                  <Label>{item.label}</Label>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ● ADVANCED */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Advanced Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Changing system settings may affect stability.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Two-Factor Authentication</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Enable Audit Logs</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <Label>Database Auto Backup</Label>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Session Timeout (min)" defaultValue="60" />
                <Input placeholder="Max Upload Size MB" defaultValue="10" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Backup Now</Button>
                <Button variant="destructive">Reset System</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
