export default function EmptyState({ message = "No data yet" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
      <svg
        className="w-12 h-12 mb-3 opacity-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M3 21h18M12 3a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}
