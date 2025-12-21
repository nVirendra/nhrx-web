"use client";
import { useState } from "react";

// ---------- API HOOKS ----------
import {
  useSendOrgOtp, useVerifyOrgOtp,
  useRegisterOrganization
} from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";


// ---------- SHADCN UI ----------
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ---------- ICONS ----------
import { Mail, Loader2, MapPin, Image } from "lucide-react";

export default function Signup() {

  const router = useRouter();

  const [step, setStep] = useState("email"); // email → otp → business
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    about: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    logo: null,
  });

  // ------------- API HOOKS -------------
  const sendOtpMutation = useSendOrgOtp();
  const verifyOtpMutation = useVerifyOrgOtp();
  const registerOrgMutation = useRegisterOrganization();

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    await sendOtpMutation.mutateAsync(
      { email },
      {
        onSuccess: () => {
          setStep("otp");
        },
        onError: (err) => {
          alert(err?.response?.data?.message || "Failed to send OTP");
        },
      }
    );
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    await verifyOtpMutation.mutateAsync(
      { email, otp },
      {
        onSuccess: () => {
          setStep("business");
        },
        onError: (err) => {
          alert(err?.response?.data?.message || "Invalid OTP");
        },
      }
    );
  };

  // ---------------- REGISTER BUSINESS ----------------
  const handleSubmit = async () => {
    const payload = {
      email,
      ...form,
    };

    await registerOrgMutation.mutateAsync(payload, {
      onSuccess: () => {
        alert("Business Registered Successfully 🎉");
        router.push("/auth/login");
      },
      onError: (err) => {
        alert(err?.response?.data?.message || "Registration Failed");
      },
    });
  };

  // ---------------- FORM CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100">

      {/* -------------------------------- EMAIL SCREEN -------------------------------- */}
      {step === "email" && (
        <Card className="w-full max-w-lg shadow-xl border-none bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Register Your Organization
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <Label>Email Address (Business Admin)</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <Button
              className="w-full h-12"
              disabled={!email || sendOtpMutation.isPending}
              onClick={handleSendOtp}
            >
              {sendOtpMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Verification OTP"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* -------------------------------- OTP SCREEN -------------------------------- */}
      {step === "otp" && (
        <Card className="w-full max-w-lg shadow-xl border-none bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Verify Email
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-center text-gray-700 text-sm">
              An OTP has been sent to <b>{email}</b>
            </p>

            <Label>Enter OTP</Label>
            <Input
              placeholder="Enter 6-digit OTP"
              className="h-12 text-center tracking-[0.3em] text-lg"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              className="w-full h-12"
              disabled={otp.length < 6 || verifyOtpMutation.isPending}
              onClick={handleVerifyOtp}
            >
              {verifyOtpMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify Email"
              )}
            </Button>

            <Separator />

            <button
              className="text-sm text-indigo-600 w-full text-center hover:underline"
              onClick={() => setStep("email")}
            >
              Change Email
            </button>
          </CardContent>
        </Card>
      )}

      {/* -------------------------------- BUSINESS FORM -------------------------------- */}
      {step === "business" && (
        <Card className="w-full max-w-2xl shadow-xl border-none bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Business Information
            </CardTitle>
            <p className="text-center text-gray-600 text-sm">
              Admin Email Verified: <b>{email}</b>
            </p>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  name="companyName"
                  placeholder="Ex: TechVision Pvt Ltd"
                  value={form.companyName}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input
                  name="phone"
                  placeholder="+91 9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>About Company</Label>
              <Textarea
                name="about"
                placeholder="Short description about your business..."
                value={form.about}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <Separator />
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" /> Address Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  placeholder="Street / Building"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>ZIP / Postal Code</Label>
                <Input
                  name="zip"
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company Logo (Optional)</Label>
              <div className="border rounded-lg p-3 flex items-center gap-4">
                <Image className="w-8 h-8 text-gray-400" />
                <Input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    setForm({ ...form, logo: e.target.files[0] })
                  }
                />
              </div>
            </div>

            <Button
              className="w-full h-12 text-base font-semibold"
              disabled={registerOrgMutation.isPending}
              onClick={handleSubmit}
            >
              {registerOrgMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Complete Registration"
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
