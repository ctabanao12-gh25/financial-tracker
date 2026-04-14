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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col gap-5 h-full">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Spending Overview
        </p>
        <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg">
          {monthLabel}
        </span>
      </div>

      {/* Balance */}
      <div>
        <p
          className={`text-[2.15rem] font-bold tracking-tight leading-none ${
            isPositive ? "text-white" : "text-rose-400"
          }`}
        >
          {formatCurrency(balance)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
              isPositive
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-rose-500/15 text-rose-400"
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
            <span className="text-xs text-slate-500">
              {savingsRate}% savings rate
            </span>
          )}
        </div>
      </div>

      {/* Income vs Expenses ratio bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-emerald-400 font-medium">Income</span>
          <span className="text-rose-400 font-medium">Expenses</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${incomeRatio}%` }}
          />
          <div className="flex-1 bg-rose-500/60 rounded-full" />
        </div>
        <div className="flex justify-between text-xs mt-1 text-slate-600">
          <span>{incomeRatio.toFixed(0)}%</span>
          <span>{(100 - incomeRatio).toFixed(0)}%</span>
        </div>
      </div>

      {/* Income / Expense stats */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-slate-800/60 rounded-xl px-3.5 py-3 border border-slate-700/30">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-xs text-slate-500">Income</span>
          </div>
          <p className="text-base font-bold text-emerald-400 leading-none">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-slate-800/60 rounded-xl px-3.5 py-3 border border-slate-700/30">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
            <span className="text-xs text-slate-500">Expenses</span>
          </div>
          <p className="text-base font-bold text-rose-400 leading-none">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

    </div>
  );
}
