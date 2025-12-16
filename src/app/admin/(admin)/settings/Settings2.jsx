// pages/Settings/SystemSettings.jsx (HRMS Version)

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Settings,
  Users,
  CalendarClock,
  CalendarDays,
  CreditCard,
  Building,
  Globe,
  ClipboardList,
  Bell,
  Plane,
  Wallet,
  Upload,
  Eye,
  Save,
  AlertTriangle,
  Database,
  Info,
} from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
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
          <h1 className="text-3xl font-bold">HRMS Settings</h1>
          <p className="text-muted-foreground">Configure your HR management system</p>
        </div>

        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save All Settings
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="shift">Shift & Weekoff</TabsTrigger>
          <TabsTrigger value="travel">Travel / DA</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* ============================
                GENERAL SETTINGS
        ============================ */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General HRMS Settings</CardTitle>
              <CardDescription>Basic configuration for your HR system</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>HRMS Name *</Label>
                  <Input placeholder="Ex: V-HRM System" defaultValue="HRMS Pro Suite" />
                </div>

                <div className="space-y-2">
                  <Label>Admin Email *</Label>
                  <Input type="email" placeholder="admin@company.com" />
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">IST (India)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Disable login for all users</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Developer debugging tools</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
               COMPANY SETTINGS
        ============================ */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" /> Company Profile
              </CardTitle>
              <CardDescription>Business identity & contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input placeholder="Your Company Name" />
              </div>

              <div className="space-y-2">
                <Label>About Company</Label>
                <Textarea placeholder="Brief company description..." rows={4} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex gap-2">
                    <Input type="file" accept="image/*" />
                    <Button variant="outline"><Upload className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input placeholder="https://company.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
            ATTENDANCE SETTINGS
        ============================ */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Attendance Policies
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label>Enable Auto Attendance</Label>
                  <p className="text-sm text-muted-foreground">Use geofencing / IP tracking / QR</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Late Mark After (minutes)</Label>
                <Input type="number" defaultValue="10" />
              </div>

              <div className="space-y-2">
                <Label>Half-Day Rule (hours)</Label>
                <Input type="number" defaultValue="4" />
              </div>

              <div className="space-y-2">
                <Label>Full-Day Rule (hours)</Label>
                <Input type="number" defaultValue="8" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
              LEAVE SETTINGS
        ============================ */}
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Leave Policies
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Annual Leave Quota</Label>
                <Input type="number" defaultValue="18" />
              </div>

              <div className="space-y-3">
                <div className="p-3 border rounded-lg flex justify-between">
                  <div>
                    <Label>Carry Forward Enabled</Label>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-3 border rounded-lg flex justify-between">
                  <div>
                    <Label>Encashment Allowed</Label>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
              PAYROLL SETTINGS
        ============================ */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payroll Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <Label>Enable PF / ESIC</Label>
                  <p className="text-muted-foreground text-sm">Statutory contributions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Salary Process Day</Label>
                <Input type="number" placeholder="Ex: 30" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label>Overtime Rate per Hour</Label>
                <Input type="number" placeholder="Ex: 80" defaultValue="80" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
              SHIFT SETTINGS
        ============================ */}
        <TabsContent value="shift">
          <Card>
            <CardHeader>
              <CardTitle>Shift & Weekly Off Configuration</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Label>Default Shift</Label>
              <Input placeholder="09:00 AM - 06:00 PM" />

              <Label>Weekly Off</Label>
              <Select defaultValue="sunday">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
            TRAVEL SETTINGS (DA)
        ============================ */}
        <TabsContent value="travel">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Travel & Daily Allowance (DA)
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label>DA per Day</Label>
                <Input type="number" defaultValue="500" />
              </div>

              <div className="space-y-2">
                <Label>Hotel Stay Deduction (%)</Label>
                <Input type="number" defaultValue="50" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
            EXPENSE SETTINGS
        ============================ */}
        <TabsContent value="expense">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Expense & Claims
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between">
                <Label>Auto-Approve Below ₹500</Label>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Max Claim Per Day</Label>
                <Input type="number" defaultValue="1000" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
          NOTIFICATION SETTINGS
        ============================ */}
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
                "Email Notifications",
                "SMS Notifications",
                "Employee Onboarding Alerts",
                "Leave Request Notifications",
                "Attendance Alerts",
                "Payroll Alerts",
              ].map((item) => (
                <div key={item} className="p-3 border rounded-lg flex justify-between">
                  <Label>{item}</Label>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================
              ADVANCED SETTINGS
        ============================ */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" /> Advanced Settings
              </CardTitle>
              <CardDescription>System performance and backup features</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  These settings may impact performance. Modify with caution.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="flex justify-between p-3 border rounded-lg">
                  <Label>Enable Caching</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between p-3 border rounded-lg">
                  <Label>Auto Database Backup</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between p-3 border rounded-lg">
                  <Label>Error Logging</Label>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Max Upload Size (MB)</Label>
                  <Input type="number" defaultValue="10" />
                </div>

                <div>
                  <Label>Session Lifetime (minutes)</Label>
                  <Input type="number" defaultValue="120" />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Backup Now</Button>
                <Button variant="destructive">Restore Defaults</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
