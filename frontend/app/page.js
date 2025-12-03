"use client";

import { useState } from "react";
import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import UploadArea from "@/components/UploadArea";
import DocumentsSection from "@/components/RequestedDocuments/DocumentsSection";
import AdditionalInfoForm from "@/components/AdditionalInfoForm";

export default function Page() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploadState, setUploadState] = useState("initial");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    licenseNo: "",
    expiryDate: "",
    address: "",
    dob: "",
  });

  return (
    <main className="min-h-screen bg-[#F6F7FB] pb-10">
      <div className="w-full sticky top-0 z-10">
        <Header />
      </div>
      <WelcomeCard />
      <div className="mx-auto max-w-5xl px-8 py-10">
        <UploadArea
          file={file}
          setFile={setFile}
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          form={form}
          setForm={setForm}
          uploadState={uploadState}
          setUploadState={setUploadState}
        />

        <DocumentsSection file={file} fileUrl={fileUrl} uploadState={uploadState} />
      </div>
      <div className="w-full">
        <AdditionalInfoForm form={form} setForm={setForm} uploadState={uploadState} setUploadState={setUploadState} />
      </div>
    </main>
  );
}
