"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Building2,
  Lock,
  Mail,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { useLogin } from "@/features/auth/auth.api";
import { useAuthStore } from "@/features/auth/auth.store";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "HrExtreme";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin();
  const { setAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Login submit
  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          // backend returns: { success, message, user }
          setAuth(data.user);

          // redirect to admin dashboard
          router.replace("/admin/dashboard");
        },
        onError: (error) => {
          alert(
            error?.response?.data?.message ||
              "Invalid email or password"
          );
        },
      }
    );
  };

  const handleAccessWorkplace = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

        {/* ───────── LEFT PANEL ───────── */}
        <div className="hidden lg:block space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl shadow-lg bg-primary shadow-primary/30">
              <Building2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{APP_NAME}</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Manage HR, Payroll & Attendance
              <span className="text-primary block">
                With Ease & Intelligence
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              A powerful HRMS suite covering attendance, payroll, leave,
              recruitment, onboarding & compliance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6">
            {[
              ["Employee Management", "Centralized records"],
              ["Automated Payroll", "Accurate processing"],
              ["Attendance Tracking", "QR, GPS, Biometric"],
              ["Performance Reviews", "360° evaluations"],
            ].map(([title, subtitle], idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">{title}</h4>
                  <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="group border-primary text-primary hover:bg-primary/10"
          >
            Explore All Features
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
          </Button>
        </div>

        {/* ───────── RIGHT PANEL (LOGIN) ───────── */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-none rounded-2xl shadow-xl shadow-primary/20 bg-white/90">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Access your HRMS dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      value={email}
                      disabled={loginMutation.isPending}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      value={password}
                      disabled={loginMutation.isPending}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loginMutation.isPending}
                  className="w-full h-12 font-semibold shadow-lg shadow-primary/30"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <Separator />

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Don't have access?{" "}
                  <button
                    onClick={handleAccessWorkplace}
                    className="font-semibold text-primary hover:underline"
                  >
                    Access Workplace
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
