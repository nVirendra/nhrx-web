import React, { useState, useEffect } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const SalaryStructurePage = () => {
  const [employee, setEmployee] = useState("");
  const [ctc, setCtc] = useState("");
  const [structure, setStructure] = useState({
    basic: 0,
    hra: 0,
    conveyance: 0,
    medical: 0,
    specialAllowance: 0,
    pfEmployee: 0,
    pfEmployer: 0,
    esicEmployee: 0,
    esicEmployer: 0,
    gratuity: 0,
    professionalTax: 0,
    netSalary: 0,
  });

  // Auto calculation when CTC changes
  useEffect(() => {
    if (!ctc || isNaN(ctc)) return;

    const ctcValue = parseFloat(ctc);

    const basic = ctcValue * 0.40;
    const hra = basic * 0.50;
    const conveyance = 1600 * 12; // yearly value
    const medical = 1250 * 12;

    const specialAllowance =
      ctcValue - (basic + hra + conveyance + medical);

    // PF Calculation (12% of basic)
    const pfEmployee = basic * 0.12;
    const pfEmployer = basic * 0.12;

    // ESIC (if gross <= 21,000)
    const esicEmployee =
      ctcValue <= 21000 ? ctcValue * 0.0075 : 0;
    const esicEmployer =
      ctcValue <= 21000 ? ctcValue * 0.0325 : 0;

    // Gratuity 4.81% of basic
    const gratuity = basic * 0.0481;

    // Professional tax (simple rule example)
    const professionalTax = 200;

    const netSalary =
      (ctcValue -
        (pfEmployee + esicEmployee + professionalTax)) /
      12;

    setStructure({
      basic,
      hra,
      conveyance,
      medical,
      specialAllowance,
      pfEmployee,
      pfEmployer,
      esicEmployee,
      esicEmployer,
      gratuity,
      professionalTax,
      netSalary,
    });
  }, [ctc]);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold">Salary Structure Builder</h1>

      {/* Employee & CTC Section */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Salary Structure</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          
          {/* Employee Select */}
          <div>
            <Label>Employee *</Label>
            <Select value={employee} onValueChange={setEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Virendra Nishad</SelectItem>
                <SelectItem value="2">Priya Sharma</SelectItem>
                <SelectItem value="3">Amit Verma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CTC Input */}
          <div>
            <Label>Annual CTC (₹) *</Label>
            <Input
              placeholder="Enter Annual CTC"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Salary Components */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Components</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">

            {/* BASIC */}
            <div>
              <Label>Basic Salary</Label>
              <Input value={structure.basic.toFixed(2)} disabled />
            </div>

            {/* HRA */}
            <div>
              <Label>HRA</Label>
              <Input value={structure.hra.toFixed(2)} disabled />
            </div>

            {/* Conveyance */}
            <div>
              <Label>Conveyance Allowance</Label>
              <Input value={structure.conveyance.toFixed(2)} disabled />
            </div>

            {/* Medical */}
            <div>
              <Label>Medical Allowance</Label>
              <Input value={structure.medical.toFixed(2)} disabled />
            </div>

            {/* Special Allowance */}
            <div className="md:col-span-2">
              <Label>Special Allowance</Label>
              <Input value={structure.specialAllowance.toFixed(2)} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employer & Employee Statutory Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Statutory Contributions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <Label>PF Employee (12%)</Label>
              <Input value={structure.pfEmployee.toFixed(2)} disabled />
            </div>

            <div>
              <Label>PF Employer (12%)</Label>
              <Input value={structure.pfEmployer.toFixed(2)} disabled />
            </div>

            <div>
              <Label>ESIC Employee</Label>
              <Input value={structure.esicEmployee.toFixed(2)} disabled />
            </div>

            <div>
              <Label>ESIC Employer</Label>
              <Input value={structure.esicEmployer.toFixed(2)} disabled />
            </div>

            <div>
              <Label>Gratuity (4.81% Basic)</Label>
              <Input value={structure.gratuity.toFixed(2)} disabled />
            </div>

            <div>
              <Label>Professional Tax</Label>
              <Input value={structure.professionalTax.toFixed(2)} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">

          <div>
            <Label>Net Salary (In-Hand Monthly)</Label>
            <Input value={structure.netSalary.toFixed(2)} disabled />
          </div>

          <div>
            <Label>Total Employer Contribution</Label>
            <Input
              disabled
              value={(
                structure.pfEmployer +
                structure.esicEmployer +
                structure.gratuity
              ).toFixed(2)}
            />
          </div>

          <div>
            <Label>Total Annual CTC</Label>
            <Input value={ctc || 0} disabled />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="px-6 py-2">Save Salary Structure</Button>
      </div>
    </div>
  );
};

export default SalaryStructurePage;
