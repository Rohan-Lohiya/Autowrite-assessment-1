"use client";

import { useState } from "react";
import LabeledInput from "./LabeledInput";
import ConfirmationModal from "./ConfirmationModal";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function AdditionalInfoForm({ form, setForm, uploadState, setUploadState }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (!form.licenseNo.trim()) return "License number is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/license`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submit failed");

      // success
      setShowModal(true);
      setUploadState("success");
    } catch (err) {
      console.error("submit error", err);
      setError(err.message || "Submit failed");
      setUploadState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="rounded-2xl bg-white px-8 py-7 shadow-[0_2px_6px_rgba(0,0,0,0.05)] mb-10 max-w-7xl mx-auto">
        <h2 className="font-semibold text-[16px] mb-1 text-gray-800">Additional Information</h2>
        <p className="text-sm text-[#7A7F8A] mb-6">
          We need some additional information that may be missing from your documents.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-2 gap-6">
            <LabeledInput
              label="First Name"
              value={form.firstName}
              onChange={(v) => setForm((s) => ({ ...s, firstName: v }))}
            />
            <LabeledInput
              label="Last Name"
              value={form.lastName}
              onChange={(v) => setForm((s) => ({ ...s, lastName: v }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <LabeledInput
              label="License No."
              value={form.licenseNo}
              onChange={(v) => setForm((s) => ({ ...s, licenseNo: v }))}
            />
            <LabeledInput
              label="Expiry Date"
              value={form.expiryDate}
              onChange={(v) => setForm((s) => ({ ...s, expiryDate: v }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <LabeledInput
              label="Address"
              value={form.address}
              onChange={(v) => setForm((s) => ({ ...s, address: v }))}
            />
            <LabeledInput label="DOB" value={form.dob} onChange={(v) => setForm((s) => ({ ...s, dob: v }))} />
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full px-7 py-3 text-sm font-medium text-white disabled:opacity-70"
              style={{
                background: "linear-gradient(90deg,#19B5FE 0%, #0A62F4 100%)",
              }}
            >
              {submitting ? "Submitting..." : "Submit information"}
            </button>

            {error && <span className="text-xs text-[#F05B5B]">{error}</span>}
          </div>
        </form>
      </section>

      <ConfirmationModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
