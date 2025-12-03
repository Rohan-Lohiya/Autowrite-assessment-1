"use client";

import { useState } from "react";
import DocCard from "./DocCard";

export default function DocumentsSection({ file, fileUrl, uploadState }) {
  return (
    <div className="bg-white rounded-b-2xl p-8 mb-10">
      {/* Identification */}
      <Section title="Identification" count="1/3" status="incomplete" defaultOpen>
        <div className="grid grid-cols-3 gap-4">
          <DocCard
            status={uploadState === "success" ? "success" : "success"}
            title="Document Name-ID"
            subtitle={file?.name || "file-name-here.pdf"}
            extra="File found"
            fileUrl={fileUrl}
          />
          <DocCard
            status="error"
            title="Document Name-ID"
            subtitle="file-name-here.pdf"
            extra="Outdated file, re-upload notes here"
          />
          <DocCard status="pending" title="Document Name-ID" />
        </div>
      </Section>

      {/* Income & Employment */}
      <Section title="Income & Employment" count="0/5" status="collapsed">
        <div className="grid grid-cols-3 gap-4">
          <DocCard status="pending" title="Document Name-ID" />
          <DocCard status="pending" title="Document Name-ID" />
          <DocCard status="pending" title="Document Name-ID" />
          <DocCard status="pending" title="Document Name-ID" />
          <DocCard status="pending" title="Document Name-ID" />
        </div>
      </Section>

      {/* Downpayment */}
      <Section title="Downpayment" count="3/3" status="complete" defaultOpen>
        <div className="grid grid-cols-3 gap-4">
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
        </div>
      </Section>

      {/* Property */}
      <Section title="Property" count="3/3" status="complete" defaultOpen>
        <div className="grid grid-cols-3 gap-4">
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
          <DocCard status="success" title="Document Name-ID" subtitle="file-name-here.pdf" extra="File found" />
        </div>
      </Section>

      {/* Other Documents */}
      <Section title="Other Documents" count="0/2" status="incomplete" defaultOpen>
        <div className="grid grid-cols-3 gap-4">
          <DocCard
            status="error"
            title="Document Name-ID"
            subtitle="file-name-here.pdf"
            extra="Outdated file, re-upload notes here"
          />
          <DocCard
            status="error"
            title="Document Name-ID"
            subtitle="file-name-here.pdf"
            extra="Outdated file, re-upload notes here"
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, count, status, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const getCategoryIcon = (status) => {
    if (status === "complete") {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#5FD4A8" />
          <path d="M6 10L9 13L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (status === "incomplete") {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#F05B5B" />
          <circle cx="10" cy="7" r="1" fill="white" />
          <rect x="9" y="9" width="2" height="5" rx="1" fill="white" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#C4C7D0" strokeWidth="1.5" fill="none" />
        <path d="M10 6v4l3 3" stroke="#C4C7D0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-800"
      >
        {getCategoryIcon(status)}
        <span className="font-medium">
          {title} ({count})
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`transition-transform ${open ? "" : "-rotate-90"}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <div>{children}</div>}
    </div>
  );
}
