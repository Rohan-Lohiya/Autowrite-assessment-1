export default function LabeledInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[#54555E]">{label}</span>
      <input
        className="w-full rounded-full border border-[#E1E3EB] bg-[#F6F7FB] px-4 py-2 text-sm text-gray-600 outline-none focus:border-[#0A62F4] focus:bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
