import { useState } from "react";
import { formatCurrency } from "../utils/formatters";

export default function SavingsPage({
  balance,
  totalIncome,
  savingsRate,
  monthlyData,
  goals,
  onAddGoal,
  onUpdateSaved,
  onDeleteGoal,
}) {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  function addGoal() {
    onAddGoal(goalName, goalAmount);
    setGoalName("");
    setGoalAmount("");
  }

  const completedCount = goals.filter((g) => g.saved >= g.target).length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">Savings</h2>
        <p className="text-xs text-slate-500 mt-0.5">Track your savings goals and monthly progress</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Net Savings</p>
          <p className={`text-3xl font-bold leading-none ${balance >= 0 ? "text-white" : "text-rose-400"}`}>
            {formatCurrency(balance)}
          </p>
          <p className="text-xs text-slate-500 mt-2">Total income minus expenses</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Savings Rate</p>
          <p
            className={`text-3xl font-bold leading-none ${
              savingsRate >= 20
                ? "text-emerald-400"
                : savingsRate > 0
                ? "text-amber-400"
                : "text-rose-400"
            }`}
          >
            {totalIncome > 0 ? `${savingsRate.toFixed(1)}%` : "—"}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {savingsRate >= 20
              ? "On track — great job!"
              : totalIncome > 0
              ? "Target: 20%"
              : "No income recorded"}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Goals</p>
          <p className="text-3xl font-bold leading-none text-white">{goals.length}</p>
          <p className="text-xs text-slate-500 mt-2">
            {completedCount > 0 ? `${completedCount} completed` : "None completed yet"}
          </p>
        </div>
      </div>

      {/* Monthly savings history */}
      {monthlyData.some((d) => d.income > 0 || d.expenses > 0) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Monthly Savings History</h3>
          <div className="flex flex-col gap-3">
            {[...monthlyData]
              .reverse()
              .map((row) => {
                const saved = row.income - row.expenses;
                const maxAbs = Math.max(
                  ...monthlyData.map((d) => Math.abs(d.income - d.expenses)),
                  1
                );
                const pct = (Math.abs(saved) / maxAbs) * 90;
                return (
                  <div key={row.key} className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 w-8 flex-shrink-0">{row.label}</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          saved >= 0 ? "bg-emerald-500/70" : "bg-rose-500/70"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold w-24 text-right flex-shrink-0 ${
                        saved >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {saved !== 0 ? `${saved > 0 ? "+" : ""}${formatCurrency(saved)}` : "—"}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Savings goals */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Savings Goals</h3>

        {/* Add goal */}
        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <input
            type="text"
            placeholder="Goal name (e.g. Emergency Fund)"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
            className="flex-1 bg-slate-800 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
          />
          <input
            type="number"
            placeholder="Target ($)"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGoal()}
            min="1"
            className="w-full sm:w-32 bg-slate-800 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
          />
          <button
            onClick={addGoal}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap"
          >
            Add Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-700">
            <svg className="w-10 h-10 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">No savings goals yet</p>
            <p className="text-xs mt-1">Add a goal above to start tracking</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {goals.map((goal) => {
              const pct = Math.min((goal.saved / goal.target) * 100, 100);
              const completed = goal.saved >= goal.target;
              return (
                <div
                  key={goal.id}
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/30"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{goal.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatCurrency(goal.saved)} saved of {formatCurrency(goal.target)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {completed && (
                        <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-md font-medium">
                          Done!
                        </span>
                      )}
                      <button
                        onClick={() => onDeleteGoal(goal.id)}
                        className="text-slate-600 hover:text-rose-400 transition"
                        aria-label="Delete goal"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        completed ? "bg-emerald-500" : "bg-[var(--accent)]"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{pct.toFixed(0)}% complete</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Saved:</span>
                      <input
                        type="number"
                        value={goal.saved}
                        onChange={(e) => onUpdateSaved(goal.id, e.target.value)}
                        min="0"
                        className="w-24 bg-slate-700 border border-slate-600/50 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
