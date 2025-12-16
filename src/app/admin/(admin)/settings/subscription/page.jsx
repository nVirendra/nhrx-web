"use client";
import React, { useState, useMemo } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import {
  Wallet,
  Users,
  CheckCircle,
  BarChart3,
  Settings,
  Fingerprint,
  Camera,
  QrCode,
  UserCheck,
} from "lucide-react";

export default function SubscriptionPage() {
  const [employeeCount, setEmployeeCount] = useState(40);

  // ---------------------- MODULE LIST -------------------------
  const MODULE_LIST = [
    {
      key: "attendance",
      name: "Attendance Module",
      basePrice: 20,
      features: [
        { key: "face", title: "Face Attendance", price: 5, icon: Camera },
        { key: "selfie", title: "Selfie Attendance", price: 3, icon: UserCheck },
        { key: "biometric", title: "Biometric Device", price: 8, icon: Fingerprint },
        { key: "qr", title: "QR Scanner Attendance", price: 4, icon: QrCode },
      ],
    },
    {
      key: "payroll",
      name: "Payroll Module",
      basePrice: 30,
      features: [
        { key: "salarySlip", title: "Digital Payslips", price: 4 },
        { key: "compliance", title: "Auto Compliance", price: 7 },
      ],
    },
    {
      key: "recruitment",
      name: "Recruitment Module",
      basePrice: 15,
      features: [
        { key: "jobPosting", title: "Job Postings", price: 5 },
        { key: "resume", title: "Resume Parsing", price: 6 },
      ],
    },
    {
      key: "travel",
      name: "Travel & Expense",
      basePrice: 25,
      features: [
        { key: "autoApproval", title: "Auto Approval Rules", price: 4 },
      ],
    },
  ];

  const [selectedModules, setSelectedModules] = useState({});
  const [customPricing, setCustomPricing] = useState({});
  const [featurePricing, setFeaturePricing] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState({});

  // ---------------------- HANDLERS -------------------------

  const toggleModule = (key) => {
    setSelectedModules((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleFeature = (moduleKey, featureKey) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [featureKey]: !prev[moduleKey]?.[featureKey],
      },
    }));
  };

  const updateModulePricing = (key, value) => {
    setCustomPricing((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const updateFeaturePricing = (moduleKey, featureKey, value) => {
    setFeaturePricing((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [featureKey]: Number(value),
      },
    }));
  };

  // ---------------------- PRICE CALCULATION -------------------------

  const perEmployeeTotal = useMemo(() => {
    let sum = 0;

    MODULE_LIST.forEach((mod) => {
      if (selectedModules[mod.key]) {
        const modPrice = customPricing[mod.key] ?? mod.basePrice;
        sum += modPrice;

        // Feature wise
        mod.features.forEach((f) => {
          if (selectedFeatures[mod.key]?.[f.key]) {
            const featurePrice =
              featurePricing[mod.key]?.[f.key] ?? f.price;
            sum += featurePrice;
          }
        });
      }
    });

    return sum;
  }, [selectedModules, customPricing, selectedFeatures, featurePricing]);

  const totalCost = perEmployeeTotal * employeeCount;

  // ---------------------- UI -------------------------

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Wallet className="h-7 w-7 text-primary" />
        Subscription & Employee Cost
      </h1>

      <p className="text-muted-foreground mb-8">
        Configure module & feature subscriptions to calculate monthly billing.
      </p>

      <Card className="shadow-lg border bg-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Subscription Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* ---------------- EMPLOYEE COUNT ---------------- */}
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Total Employees
            </h3>

            <Input
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              type="number"
              min="1"
              className="w-40 mt-2"
            />
          </div>

          <Separator />

          {/* ---------------- MODULES ---------------- */}
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" /> HRMS Modules
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {MODULE_LIST.map((mod) => {
                const enabled = selectedModules[mod.key];
                const price = customPricing[mod.key] ?? mod.basePrice;

                return (
                  <Card
                    key={mod.key}
                    className={`p-6 border transition-all rounded-xl ${
                      enabled ? "border-primary shadow-md" : "border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">{mod.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Base Price: ₹{mod.basePrice} / employee
                        </p>
                      </div>
                      <Switch
                        checked={enabled}
                        onCheckedChange={() => toggleModule(mod.key)}
                      />
                    </div>

                    {/* ----- MODULE PRICING ----- */}
                    {enabled && (
                      <>
                        <div className="mt-4">
                          <label className="text-xs font-medium">
                            Module Price (Per Employee)
                          </label>

                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              value={price}
                              onChange={(e) =>
                                updateModulePricing(mod.key, e.target.value)
                              }
                              className="w-24 mt-1"
                            />
                            <Badge>₹ / month</Badge>
                          </div>

                          <Slider
                            defaultValue={[price]}
                            max={100}
                            min={10}
                            step={1}
                            className="mt-3"
                            onValueChange={([v]) =>
                              updateModulePricing(mod.key, v)
                            }
                          />
                        </div>

                        {/* ----- FEATURES INSIDE MODULE ----- */}
                        <div className="mt-6">
                          <h5 className="font-semibold text-sm mb-2">
                            Included Features
                          </h5>

                          <div className="space-y-4">
                            {mod.features.map((f) => {
                              const featureEnabled =
                                selectedFeatures[mod.key]?.[f.key] || false;

                              const featurePrice =
                                featurePricing[mod.key]?.[f.key] ?? f.price;

                              const Icon = f.icon || CheckCircle;

                              return (
                                <div
                                  key={f.key}
                                  className="p-4 border rounded-lg bg-slate-50"
                                >
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-5 w-5 text-primary" />
                                      <span className="font-medium">{f.title}</span>
                                    </div>

                                    <Switch
                                      checked={featureEnabled}
                                      onCheckedChange={() =>
                                        toggleFeature(mod.key, f.key)
                                      }
                                    />
                                  </div>

                                  {/* Feature Pricing */}
                                  {featureEnabled && (
                                    <div className="mt-3">
                                      <label className="text-xs font-medium">
                                        Feature Price (Per Employee)
                                      </label>

                                      <div className="flex items-center gap-3">
                                        <Input
                                          value={featurePrice}
                                          type="number"
                                          onChange={(e) =>
                                            updateFeaturePricing(
                                              mod.key,
                                              f.key,
                                              e.target.value
                                            )
                                          }
                                          className="w-24"
                                        />
                                        <Badge variant="outline">₹ / month</Badge>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* ---------------- SUMMARY ---------------- */}
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-blue-900">
              <CheckCircle className="h-5 w-5" />
              Billing Summary
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div>
                <p className="text-sm">Per Employee Cost</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  ₹{perEmployeeTotal}
                </h2>
              </div>

              <div>
                <p className="text-sm">Employees</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  {employeeCount}
                </h2>
              </div>

              <div>
                <p className="text-sm">Total Monthly Cost</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  ₹{totalCost}
                </h2>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="px-10 mt-4">
              Save Subscription Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
