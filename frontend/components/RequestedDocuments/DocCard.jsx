export default function DocCard({ status, title, subtitle, extra, fileUrl }) {
  const borders = {
    success: "border-[#B4E8C9] bg-[#F4FFF8]",
    error: "border-[#F7C1C1] bg-[#FFF5F5]",
    pending: "border-[#E9EBF3] bg-[#F6F7FB]",
  };

  const colors = {
    success: "bg-[#E3F8EB] text-[#24A169]",
    error: "bg-[#FDE4E4] text-[#F05B5B]",
    pending: "bg-[#ECEFFA] text-[#A3A5B0]",
  };

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-xs ${borders[status]}`}>
      <div className={`h-8 w-8 flex items-center justify-center rounded-full ${colors[status]}`}>ID</div>

      <div>
        <button
          onClick={() => fileUrl && window.open(fileUrl, "_blank")}
          disabled={!fileUrl}
          className={`font-medium text-left ${fileUrl ? "text-[#0A62F4] underline" : "text-[#54555E]"}`}
        >
          {title}
          {subtitle && <> ({subtitle})</>}
        </button>

        <div
          className={`text-[11px] mt-1 ${
            status === "success" ? "text-[#24A169]" : status === "error" ? "text-[#F05B5B]" : "text-[#A3A5B0]"
          }`}
        >
          {extra || "Pending"}
        </div>
      </div>
    </div>
  );
}
