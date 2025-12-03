"use client";

import { useRef } from "react";

const ACCEPTED = ["application/pdf", "image/jpeg", "image/png", "text/plain"];

// If you want, set NEXT_PUBLIC_BACKEND_URL in .env.local
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function UploadArea({ file, setFile, fileUrl, setFileUrl, form, setForm, uploadState, setUploadState }) {
  const inputRef = useRef(null);

  const handleSelect = async (files) => {
    const f = files?.[0];
    if (!f) return;

    if (!ACCEPTED.includes(f.type)) {
      setUploadState("error");
      return;
    }

    setFile(f);
    const url = URL.createObjectURL(f);
    setFileUrl(url);
    setUploadState("uploading");

    try {
      const formData = new FormData();
      formData.append("file", f);

      const res = await fetch(`${API_BASE}/api/upload-license`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("upload-license response:", data);

      if (data.parsedFields) {
        setForm((prev) => ({
          ...prev,
          ...data.parsedFields,
        }));
      }

      setUploadState("success");
    } catch (err) {
      console.error("Upload error:", err);
      setUploadState("error");
    }
  };

  return (
    <div className="bg-white p-7 rounded-t-2xl">
      <div className="mb-2">
        <h2 className="font-semibold text-xl mb-2 text-gray-900">Requested Documents</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="#0A62F4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <button onClick={() => inputRef.current.click()} className="text-[#0A62F4] hover:underline font-medium">
            Select files
          </button>
          <span>to upload or drag and drop them into this space.</span>
        </div>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept=".pdf,image/*,.txt"
          onChange={(e) => handleSelect(e.target.files)}
        />
      </div>

      {/* Upload Status Area */}
      {uploadState !== "initial" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            handleSelect(e.dataTransfer.files);
          }}
          className={`rounded-xl border-2 border-dashed p-6 text-sm ${
            uploadState === "uploading"
              ? "border-[#19B5FE] bg-[#E9F5FF]"
              : uploadState === "success"
              ? "border-[#5FD4A8] bg-[#E8F8F2]"
              : "border-[#F05B5B] bg-[#FDEAEA]"
          }`}
        >
          {uploadState === "uploading" && <p className="text-[#0A62F4] font-medium">Processing…</p>}

          {uploadState === "success" && file && (
            <p className="text-[#24A169] font-medium">{file.name} uploaded and processed.</p>
          )}

          {uploadState === "error" && (
            <p className="text-[#F05B5B] font-medium">Something went wrong. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
}
