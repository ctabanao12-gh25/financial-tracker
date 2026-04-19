import { formatCurrency } from "../utils/formatters";

export default function BalanceHero({ balance, totalIncome, totalExpenses }) {
  const isPositive = balance >= 0;
  const incomeRatio =
    totalIncome > 0 ? Math.min((totalIncome / (totalIncome + totalExpenses)) * 100, 100) : 50;
  const savingsRate =
    totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : null;

  const now = new Date();
  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="relative bg-slate-900 rounded-2xl border border-slate-800/80 p-5 flex flex-col gap-5 h-full overflow-hidden">
      {/* subtle accent glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-5 bg-[var(--accent)]" />

      {/* Header row */}
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          Overview
        </p>
        <span className="text-[11px] font-medium text-slate-500 bg-slate-800/80 border border-slate-700/40 px-2.5 py-1 rounded-lg">
          {monthLabel}
        </span>
      </div>

      {/* Balance */}
      <div className="relative">
        <p className="text-[11px] font-medium text-slate-500 mb-1.5">Net Balance</p>
        <p
          className={`text-[2.4rem] font-bold tracking-tight leading-none ${
            isPositive ? "text-white" : "text-rose-400"
          }`}
        >
          {isPositive ? "" : "-"}{formatCurrency(Math.abs(balance))}
        </p>
        <div className="flex items-center gap-2.5 mt-2.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {isPositive ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            {isPositive ? "Surplus" : "Deficit"}
          </span>
          {savingsRate !== null && (
            <span className="text-[11px] text-slate-500 font-medium">
              {savingsRate}% saved
            </span>
          )}
        </div>
      </div>

      {/* Income vs Expenses ratio bar */}
      <div className="relative">
        <div className="flex justify-between text-[11px] font-medium mb-2">
          <span className="text-emerald-400">Income</span>
          <span className="text-rose-400">Expenses</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${incomeRatio}%` }}
          />
          <div className="flex-1 bg-rose-500/40 rounded-full" />
        </div>
        <div className="flex justify-between text-[11px] text-slate-600 mt-1.5 font-medium">
          <span>{incomeRatio.toFixed(0)}%</span>
          <span>{(100 - incomeRatio).toFixed(0)}%</span>
        </div>
      </div>

      {/* Income / Expense stats */}
      <div className="relative grid grid-cols-2 gap-2.5 mt-auto">
        <div className="bg-slate-800/50 rounded-xl px-3.5 py-3 border border-slate-700/30 hover:border-emerald-500/20 transition-colors">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-slate-500">Income</span>
          </div>
          <p className="text-[15px] font-bold text-emerald-400 leading-none tracking-tight">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl px-3.5 py-3 border border-slate-700/30 hover:border-rose-500/20 transition-colors">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-slate-500">Expenses</span>
          </div>
          <p className="text-[15px] font-bold text-rose-400 leading-none tracking-tight">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>
    </div>
  );
}
