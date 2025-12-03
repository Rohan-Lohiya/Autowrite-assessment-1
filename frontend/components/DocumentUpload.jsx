"use client";
import React, { useState, useRef } from "react";

const COLORS = {
  border: "#E9EBF3",
  bgLight: "#F6F7FB",
  textPrimary: "#121212",
  textSecondary: "#7A7F8A",
  blue: "#0A62F4",
  blueLight: "#19B5FE",
};

const ACCEPTED = ["application/pdf", "image/jpeg", "image/png", "text/plain"];

export default function DocumentUpload({ uploadEndpoint = "/api/license" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState("initial");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    licenseNo: "",
    expiryDate: "",
    address: "",
    dob: "",
  });

  const reset = () => {
    setState("initial");
    setDragging(false);
    setError("");
    setFile(null);
    setForm({
      firstName: "",
      lastName: "",
      licenseNo: "",
      expiryDate: "",
      address: "",
      dob: "",
    });
  };

  const handleUpload = async (files) => {
    const f = files[0];
    if (!f || !ACCEPTED.includes(f.type)) {
      setError("Unsupported file. Allowed: PDF, JPG, PNG, TXT.");
      setState("error");
      return;
    }

    setError("");
    setFile(f);
    setState("uploading");

    // TXT client-side parse (simplified)
    if (f.type === "text/plain") {
      const t = await f.text();
      const pull = (label) => {
        const r = new RegExp(label + "\\s*[:\\-]?\\s*(.+)", "i");
        const m = t.match(r);
        return m ? m[1].trim() : "";
      };

      const parsed = {
        firstName: pull("First Name"),
        lastName: pull("Last Name"),
        licenseNo: pull("License No"),
        expiryDate: pull("Expiry"),
        address: pull("Address"),
        dob: pull("DOB"),
      };

      setTimeout(() => {
        setForm((s) => ({ ...s, ...parsed }));
        setState("success");
      }, 700);

      return;
    }

    // For images/PDF (simulate)
    setTimeout(() => {
      setState("success");
    }, 800);
  };

  const validateForm = () => {
    if (!form.firstName.trim()) return "First name required";
    if (!form.lastName.trim()) return "Last name required";
    if (!form.licenseNo.trim()) return "License number required";
    return "";
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const v = validateForm();
    if (v) {
      setError(v);
      setState("error");
      return;
    }

    setState("uploading");

    try {
      const res = await fetch(uploadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      setState("success");
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.06)] p-8">
      {/* Upload Box */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleUpload(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        className="cursor-pointer rounded-xl border-2 transition-all"
        style={{
          borderColor: dragging ? COLORS.blueLight : COLORS.border,
          background: dragging ? "#E9F5FF" : COLORS.bgLight,
          padding: "32px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,image/*,.txt"
          onChange={(e) => handleUpload(e.target.files)}
        />

        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, background: "#E9EBF3" }}
          >
            📄
          </div>

          <div>
            <div className="font-semibold" style={{ color: COLORS.textPrimary, fontSize: 18 }}>
              Upload driver's license
            </div>

            <div className="text-sm" style={{ color: COLORS.textSecondary }}>
              Drag & drop or click to upload (PDF, PNG, JPG, TXT)
            </div>

            <div className="mt-2 text-sm">
              {state === "initial" && <span className="text-gray-500">No file selected</span>}
              {state === "uploading" && <span className="text-blue-500">Processing…</span>}
              {state === "success" && file && <span className="text-green-600">{file.name} ✓</span>}
              {state === "error" && <span className="text-red-600">{error}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="mt-8 space-y-6" onSubmit={submitForm}>
        <div className="grid grid-cols-2 gap-6">
          <Input label="First Name" value={form.firstName} onChange={(v) => setForm((f) => ({ ...f, firstName: v }))} />

          <Input label="Last Name" value={form.lastName} onChange={(v) => setForm((f) => ({ ...f, lastName: v }))} />
        </div>

        <Input
          label="License Number"
          value={form.licenseNo}
          onChange={(v) => setForm((f) => ({ ...f, licenseNo: v }))}
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Expiry Date"
            value={form.expiryDate}
            onChange={(v) => setForm((f) => ({ ...f, expiryDate: v }))}
          />
          <Input label="Date of Birth" value={form.dob} onChange={(v) => setForm((f) => ({ ...f, dob: v }))} />
        </div>

        <Input textarea label="Address" value={form.address} onChange={(v) => setForm((f) => ({ ...f, address: v }))} />

        <div className="flex gap-4">
          <button
            className="px-6 py-3 rounded-lg text-white"
            style={{
              background: "linear-gradient(90deg, #19B5FE, #0A62F4)",
            }}
          >
            Submit information
          </button>

          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg"
            style={{
              background: "#F1F2F6",
              color: COLORS.textPrimary,
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, textarea }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-[#54555E]">{label}</label>

      {textarea ? (
        <textarea
          rows="3"
          className="w-full rounded-lg border px-3 py-2"
          style={{ borderColor: "#E1E3EB" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-lg border px-3 py-2"
          style={{ borderColor: "#E1E3EB" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
