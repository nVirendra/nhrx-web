import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

const PayslipPage = () => {
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState("");

  // Dummy Structure (Replace with API data later)
  const payslipData = {
    employeeName: "Virendra Nishad",
    designation: "Software Engineer",
    department: "Engineering",
    employeeId: "EMP0012",

    earnings: {
      basic: 20000,
      hra: 10000,
      specialAllowance: 8000,
      conveyance: 1600,
      medical: 1250,
    },

    deductions: {
      pf: 2400,
      esic: 0,
      professionalTax: 200,
      tds: 1500,
    },

    bankDetails: {
      bankName: "HDFC Bank",
      accountNumber: "XXXXXX9876",
      ifsc: "HDFC0001122",
    },
  };

  const grossEarnings = Object.values(payslipData.earnings).reduce(
    (a, b) => a + b,
    0
  );

  const totalDeductions = Object.values(payslipData.deductions).reduce(
    (a, b) => a + b,
    0
  );

  const netPay = grossEarnings - totalDeductions;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold">Payslip Generation</h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Payslip</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          {/* Employee */}
          <div>
            <Label>Select Employee</Label>
            <Select value={employee} onValueChange={setEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Choose employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Virendra Nishad</SelectItem>
                <SelectItem value="2">Priya Sharma</SelectItem>
                <SelectItem value="3">Amit Verma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Month */}
          <div>
            <Label>Select Month</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <SelectItem value={m} key={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button>Generate Payslip</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payslip Display */}
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle>Payslip – {month || "Month"} </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Employee Info */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p><b>Name:</b> {payslipData.employeeName}</p>
              <p><b>Employee ID:</b> {payslipData.employeeId}</p>
              <p><b>Department:</b> {payslipData.department}</p>
            </div>
            <div>
              <p><b>Designation:</b> {payslipData.designation}</p>
              <p><b>Bank:</b> {payslipData.bankDetails.bankName}</p>
              <p><b>Account No:</b> {payslipData.bankDetails.accountNumber}</p>
            </div>
          </div>

          <Separator />

          {/* Earnings and Deductions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* EARNINGS */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Earnings</h2>
              <div className="space-y-2">
                {Object.entries(payslipData.earnings).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>₹ {value.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-bold">
                <span>Gross Earnings</span>
                <span>₹ {grossEarnings.toFixed(2)}</span>
              </div>
            </div>

            {/* DEDUCTIONS */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Deductions</h2>
              <div className="space-y-2">
                {Object.entries(payslipData.deductions).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span>₹ {value.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-bold">
                <span>Total Deductions</span>
                <span>₹ {totalDeductions.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Net Salary */}
          <div className="flex justify-between text-xl font-bold">
            <span>Net Salary (Take Home)</span>
            <span>₹ {netPay.toFixed(2)}</span>
          </div>

          {/* Download button */}
          <div className="flex justify-end mt-6">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download Payslip (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipPage;
