export default function ProgressCircle({ percent }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#5FD4A8"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <span className="text-1xl font-semibold text-gray-800">{percent}%</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <text x="8" y="11" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="600">
                i
              </text>
            </svg>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Completed</div>
        </div>
      </div>
    </div>
  );
}
