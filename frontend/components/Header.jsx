import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6 bg-white p-3 w-full">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-[#0FFCBE] flex items-center justify-center">
          <Image src="/logo.png" height={40} width={40} alt="Logo" />
        </div>

        {/* Vertical divider */}
        <div className="w-px h-8 bg-gray-300" aria-hidden="true" />

        <span className="font-semibold text-[18px] text-[#6E7180]">Document Upload Portal</span>
      </div>

      <button className="rounded-full bg-[#E9EBF3] px-5 py-2 text-sm text-[#54555E]">Broker Logo</button>
    </header>
  );
}
