export default function ConfirmationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✔</span>
            <h2 className="text-sm font-semibold">Confirmation Pop up</h2>
          </div>
          <button type="button" className="text-sm text-gray-400" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="mb-6 text-xs text-[#7A7F8A]">Your information has been submitted successfully.</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#EFF1F7] px-4 py-2 text-xs text-[#54555E]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-xs font-medium text-white"
            style={{
              background: "linear-gradient(90deg,#19B5FE 0%, #0A62F4 100%)",
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
