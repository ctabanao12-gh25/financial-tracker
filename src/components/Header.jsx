export default function Header({ userName, initials, avatarGradient, onOpenSettings }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/60 h-16 flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h1 className="text-lg font-bold text-white leading-none">
          {greeting}, {userName} 👋
        </h1>
        <p className="hidden sm:block text-xs text-slate-500 mt-0.5">{dateStr}</p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/80 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* Adjust Settings */}
        <button
          onClick={onOpenSettings}
          className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white text-xs font-medium px-3.5 py-2 rounded-xl transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Adjust Settings
        </button>

        {/* Avatar — click to open settings */}
        <button
          onClick={onOpenSettings}
          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
            avatarGradient || "from-violet-500 to-indigo-600"
          } flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition select-none`}
        >
          {initials}
        </button>
      </div>
    </header>
  );
}
