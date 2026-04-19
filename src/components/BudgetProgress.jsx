import { useState, useRef, useEffect } from "react";
import { formatCurrency } from "../utils/formatters";

function getBarColor(pct) {
  if (pct >= 100) return { bar: "#f43f5e", text: "text-rose-400", bg: "bg-rose-500/8", border: "border-rose-500/20" };
  if (pct >= 80)  return { bar: "#f97316", text: "text-orange-400", bg: "bg-orange-500/8", border: "border-orange-500/20" };
  if (pct >= 60)  return { bar: "#f59e0b", text: "text-amber-400", bg: "bg-amber-500/8", border: "border-amber-500/20" };
  return          { bar: "#10b981", text: "text-emerald-400", bg: "bg-emerald-500/8", border: "border-emerald-500/20" };
}

export default function BudgetProgress({ monthKey, budget, spent, onSetBudget }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const rawPct = budget > 0 ? (spent / budget) * 100 : 0;
  const clampedPct = Math.min(rawPct, 100);
  const isOver = budget > 0 && spent > budget;
  const colors = getBarColor(rawPct);

  const monthLabel =
    monthKey && /^\d{4}-\d{2}$/.test(monthKey)
      ? new Date(monthKey + "-02").toLocaleString("en-US", { month: "long", year: "numeric" })
      : "Current Month";

  function startEdit() {
    setInputValue(budget > 0 ? String(budget) : "");
    setEditing(true);
  }

  function handleSave() {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0) onSetBudget(monthKey, val);
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-white leading-none">
              {monthLabel} Budget
            </h2>
            {budget > 0 && (
              <p className={`text-[11px] mt-0.5 font-medium ${isOver ? "text-rose-400" : "text-slate-500"}`}>
                {isOver
                  ? `Over by ${formatCurrency(spent - budget)}`
                  : `${clampedPct.toFixed(0)}% used`}
              </p>
            )}
            {budget === 0 && (
              <p className="text-[11px] text-slate-600 mt-0.5">No budget set</p>
            )}
          </div>
        </div>

        {editing ? (
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[13px]">$</span>
              <input
                ref={inputRef}
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                placeholder="2000"
                min="1"
                step="1"
                className="w-28 bg-slate-800 border border-[var(--accent-border)] text-slate-100 rounded-xl pl-7 pr-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[11px] font-semibold px-3 py-2 rounded-xl transition-all duration-150"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-slate-500 hover:text-slate-300 text-[13px] px-2 py-2 rounded-xl transition-all duration-150"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[var(--accent-light)] bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-[var(--accent-border)] px-3 py-2 rounded-xl transition-all duration-150 flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {budget > 0 ? "Edit" : "Set Budget"}
          </button>
        )}
      </div>

      {budget === 0 ? (
        <div
          className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/30 cursor-pointer hover:border-[var(--accent-border)] hover:bg-slate-800/60 transition-all duration-150 group"
          onClick={startEdit}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--accent-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-300">Set a monthly budget</p>
              <p className="text-[11px] text-slate-600 mt-0.5">Track spending against a limit</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[var(--accent-light)] flex-shrink-0">
            Get started →
          </span>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="mb-5">
            <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-2">
              <span>$0</span>
              <span>{formatCurrency(budget)}</span>
            </div>
            <div className="relative h-2.5 bg-slate-800 rounded-full overflow-hidden">
              {[25, 50, 75].map((pctMark) => (
                <div
                  key={pctMark}
                  className="absolute top-0 bottom-0 w-px bg-slate-700/60"
                  style={{ left: `${pctMark}%` }}
                />
              ))}
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${clampedPct}%`,
                  background: isOver
                    ? `linear-gradient(90deg, #f43f5e, #fb7185)`
                    : `linear-gradient(90deg, #10b981, ${colors.bar})`,
                }}
              />
            </div>
            {isOver && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[11px] text-rose-400 font-semibold">
                  {((spent / budget - 1) * 100).toFixed(1)}% over budget
                </span>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className={`rounded-xl px-3 py-3 border ${colors.bg} ${colors.border}`}>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Spent</p>
              <p className={`text-[15px] font-bold leading-none tracking-tight ${colors.text}`}>
                {formatCurrency(spent)}
              </p>
            </div>
            <div className="rounded-xl px-3 py-3 bg-slate-800/50 border border-slate-700/30">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Budget</p>
              <p className="text-[15px] font-bold text-white leading-none tracking-tight">
                {formatCurrency(budget)}
              </p>
            </div>
            <div className={`rounded-xl px-3 py-3 border ${
              isOver ? "bg-rose-500/8 border-rose-500/20" : "bg-emerald-500/8 border-emerald-500/20"
            }`}>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {isOver ? "Over by" : "Left"}
              </p>
              <p className={`text-[15px] font-bold leading-none tracking-tight ${
                isOver ? "text-rose-400" : "text-emerald-400"
              }`}>
                {formatCurrency(Math.abs(budget - spent))}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
