"use client";

import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import {
  useSendOrgOtp,
  useVerifyOrgOtp,
  useRegisterOrganization,
} from "@/features/auth/auth.api";

export default function OrganizationRegister() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    contactNumber: "",
    about: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    logo: null,
  });

  // API Hooks
  const sendOtpMutation = useSendOrgOtp();
  const verifyOtpMutation = useVerifyOrgOtp();
  const registerMutation = useRegisterOrganization();

  // STEP 1 — SEND OTP
  const sendOtp = () => {
    if (!email) return alert("Enter email");

    sendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => setStep(2),
        onError: (err) =>
          alert(err?.response?.data?.message || "Failed to send OTP"),
      }
    );
  };

  // STEP 2 — VERIFY OTP
  const verifyOtp = () => {
    if (!otp) return alert("Enter OTP");

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => setStep(3),
        onError: (err) =>
          alert(err?.response?.data?.message || "Invalid OTP"),
      }
    );
  };

  // STEP 3 — REGISTER ORGANIZATION
  const registerOrg = () => {
    registerMutation.mutate(
      {
        email,
        ...form,
      },
      {
        onSuccess: () => {
          alert("Organization Registered Successfully 🎉");
          window.location.href = "/auth/login";
        },
        onError: (err) =>
          alert(err?.response?.data?.message || "Registration Failed"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Register Your Organization
            </h1>

            <label>Email Address (Business Admin)</label>

            <div className="mt-2 flex items-center border border-purple-400 rounded-xl px-3">
              <Mail className="text-purple-500 w-5 h-5" />
              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full px-3 py-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={sendOtpMutation.isPending}
              className="w-full mt-6 py-3 bg-purple-400 rounded-xl text-white font-semibold"
            >
              {sendOtpMutation.isPending
                ? "Sending..."
                : "Send Verification OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Register Your Organization
            </h1>

            <p className="text-center text-gray-600 mb-4">
              An OTP has been sent to <b>{email}</b>
            </p>

            <label>Enter OTP</label>

            <input
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              disabled={verifyOtpMutation.isPending}
              className="w-full mt-6 py-3 bg-purple-400 rounded-xl text-white font-semibold"
            >
              {verifyOtpMutation.isPending
                ? "Verifying..."
                : "Verify Email"}
            </button>

            <hr className="my-4" />

            <button
              onClick={() => setStep(1)}
              className="w-full text-blue-600"
            >
              Change Email
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center">
              Business Information
            </h1>

            <p className="text-center text-gray-600 mb-6">
              Admin Email Verified: <b>{email}</b>
            </p>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Company Name"
                className="border p-3 rounded-xl"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
              />

              <input
                placeholder="Contact Number"
                className="border p-3 rounded-xl"
                value={form.contactNumber}
                onChange={(e) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
              />
            </div>

            <textarea
              placeholder="About your company..."
              className="border p-3 rounded-xl w-full mt-3"
              rows={3}
              value={form.about}
              onChange={(e) =>
                setForm({ ...form, about: e.target.value })
              }
            />

            <h3 className="mt-6 font-semibold flex items-center gap-2">
              <MapPin className="text-purple-500" /> Address Details
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                placeholder="Address"
                className="border p-3 rounded-xl"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
              <input
                placeholder="City"
                className="border p-3 rounded-xl"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              />
              <input
                placeholder="State"
                className="border p-3 rounded-xl"
                value={form.state}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value })
                }
              />
              <input
                placeholder="ZIP Code"
                className="border p-3 rounded-xl"
                value={form.zip}
                onChange={(e) =>
                  setForm({ ...form, zip: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <p>Company Logo (Optional)</p>
              <input
                type="file"
                className="mt-2"
                onChange={(e) =>
                  setForm({ ...form, logo: e.target.files[0] })
                }
              />
            </div>

            <button
              onClick={registerOrg}
              disabled={registerMutation.isPending}
              className="w-full mt-6 py-3 bg-purple-600 text-white rounded-xl font-semibold"
            >
              {registerMutation.isPending
                ? "Registering..."
                : "Complete Registration"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
