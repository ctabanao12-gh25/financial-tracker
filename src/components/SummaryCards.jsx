import { formatCurrency } from "../utils/formatters";

function Card({ label, value, sub, accentColor, glowColor, icon, isNegative }) {
  return (
    <div className={`relative bg-slate-900 rounded-2xl border border-slate-800 p-5 overflow-hidden`}>
      {/* background glow */}
      <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20 ${glowColor}`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accentColor}`}>
            {icon}
          </div>
        </div>
        <p className={`text-2xl font-bold tracking-tight ${isNegative ? "text-rose-400" : "text-white"}`}>
          {value}
        </p>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
        {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function SummaryCards({ totalIncome, totalExpenses, balance, savingsRate }) {
  const expenseRatio = totalIncome > 0
    ? ((totalExpenses / totalIncome) * 100).toFixed(1)
    : null;

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card
        label="Total Income"
        value={formatCurrency(totalIncome)}
        accentColor="bg-emerald-500/10 text-emerald-400"
        glowColor="bg-emerald-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        }
      />
      <Card
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        sub={expenseRatio ? `${expenseRatio}% of income` : null}
        accentColor="bg-rose-500/10 text-rose-400"
        glowColor="bg-rose-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        }
      />
      <Card
        label="Net Balance"
        value={formatCurrency(balance)}
        isNegative={balance < 0}
        accentColor={balance < 0 ? "bg-rose-500/10 text-rose-400" : "bg-[var(--accent-subtle)] text-[var(--accent-light)]"}
        glowColor={balance < 0 ? "bg-rose-500" : "bg-[var(--accent)]"}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        }
      />
      <Card
        label="Savings Rate"
        value={totalIncome > 0 ? `${savingsRate.toFixed(1)}%` : "—"}
        sub={totalIncome > 0 ? (savingsRate >= 20 ? "On track" : "Below target") : "No income yet"}
        accentColor="bg-cyan-500/10 text-cyan-400"
        glowColor="bg-cyan-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
    </div>
  );
}
