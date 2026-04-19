import { useState } from "react";

const THEME_PRESETS = [
  { id: "violet",  label: "Violet",  color: "#7c3aed" },
  { id: "blue",    label: "Blue",    color: "#2563eb" },
  { id: "cyan",    label: "Cyan",    color: "#0891b2" },
  { id: "emerald", label: "Emerald", color: "#059669" },
  { id: "rose",    label: "Rose",    color: "#e11d48" },
  { id: "amber",   label: "Amber",   color: "#d97706" },
];

const AVATAR_PRESETS = [
  { id: "violet",  gradient: "from-violet-500 to-indigo-600",  label: "Purple" },
  { id: "emerald", gradient: "from-emerald-500 to-teal-600",   label: "Green"  },
  { id: "rose",    gradient: "from-rose-500 to-pink-600",      label: "Pink"   },
  { id: "amber",   gradient: "from-amber-500 to-orange-600",   label: "Orange" },
  { id: "sky",     gradient: "from-sky-500 to-blue-600",       label: "Blue"   },
  { id: "slate",   gradient: "from-slate-400 to-slate-600",    label: "Gray"   },
];

export default function SettingsPage({
  profile,
  initials,
  onUpdateProfile,
  transactions,
  onClearData,
}) {
  const [nameInput, setNameInput] = useState(profile.name);
  const [savedMsg, setSavedMsg] = useState(false);

  const currentPresetId =
    AVATAR_PRESETS.find((p) => profile.avatarGradient === p.gradient)?.id ?? "violet";

  function saveName() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    onUpdateProfile({ name: trimmed });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  function selectGradient(gradient) {
    onUpdateProfile({ avatarGradient: gradient });
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClearData() {
    if (
      window.confirm(
        "Delete all transactions and budgets? This cannot be undone."
      )
    ) {
      onClearData();
    }
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h2 className="text-base font-bold text-white">Settings</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Manage your profile and app preferences</p>
      </div>

      {/* ── Profile ── */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5">
        <h3 className="text-[13px] font-semibold text-white mb-5">Profile</h3>

        {/* Avatar preview */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
              profile.avatarGradient || "from-violet-500 to-indigo-600"
            } flex items-center justify-center text-white text-xl font-bold select-none shadow-lg`}
          >
            {initials}
          </div>
          <div>
            <p className="text-[15px] font-bold text-white leading-none">{profile.name}</p>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} recorded
            </p>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-5">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Display Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              maxLength={30}
              className="flex-1 bg-slate-800/60 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] hover:border-slate-600/70 transition-all duration-150"
            />
            <button
              onClick={saveName}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-150 min-w-[70px] ${
                savedMsg
                  ? "bg-emerald-600 text-white"
                  : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] text-white"
              }`}
            >
              {savedMsg ? "Saved!" : "Save"}
            </button>
          </div>
        </div>

        {/* Avatar color */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Avatar Color
          </label>
          <div className="flex gap-2.5 flex-wrap">
            {AVATAR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => selectGradient(preset.gradient)}
                title={preset.label}
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${preset.gradient} transition-all duration-150 ${
                  currentPresetId === preset.id
                    ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg"
                    : "opacity-50 hover:opacity-90 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Appearance ── */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5">
        <h3 className="text-[13px] font-semibold text-white mb-4">Appearance</h3>
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Accent Color</label>
        <div className="flex gap-4 flex-wrap">
          {THEME_PRESETS.map((preset) => {
            const isActive = (profile.theme || "violet") === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onUpdateProfile({ theme: preset.id })}
                title={preset.label}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg"
                      : "opacity-50 hover:opacity-90 hover:scale-105"
                  }`}
                  style={{ backgroundColor: preset.color }}
                >
                  {isActive && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className={`text-[11px] font-medium transition-colors ${isActive ? "text-slate-200" : "text-slate-600 group-hover:text-slate-400"}`}>
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Data Management ── */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5">
        <h3 className="text-[13px] font-semibold text-white mb-4">Data Management</h3>
        <div className="flex flex-col gap-3">
          {/* Export */}
          <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
            <div>
              <p className="text-[13px] font-semibold text-slate-200">Export Transactions</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Download all {transactions.length} transactions as JSON
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={transactions.length === 0}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-[12px] font-semibold px-3.5 py-2 rounded-xl transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>

          {/* Clear */}
          <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-rose-500/10">
            <div>
              <p className="text-[13px] font-semibold text-slate-200">Clear All Data</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Permanently delete all transactions and budgets
              </p>
            </div>
            <button
              onClick={handleClearData}
              className="flex items-center gap-1.5 bg-rose-500/8 hover:bg-rose-500/15 text-rose-400 text-[12px] font-semibold px-3.5 py-2 rounded-xl border border-rose-500/20 transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5">
        <h3 className="text-[13px] font-semibold text-white mb-4">About</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-white">Finto Flash</p>
            <p className="text-[11px] text-slate-500 font-medium">Personal Finance Tracker · v1.0.0</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          All data is stored locally in your browser. Nothing is sent to any server.
        </p>
      </div>
    </div>
  );
}
