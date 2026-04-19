import { formatCurrency } from "../utils/formatters";

function Card({ label, value, sub, subPositive, accentColor, glowColor, icon }) {
  return (
    <div className="relative bg-slate-900 rounded-2xl border border-slate-800/80 p-5 overflow-hidden group hover:border-slate-700/80 transition-all duration-200">
      <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-3xl opacity-10 ${glowColor} group-hover:opacity-15 transition-opacity`} />
      <div className="relative flex flex-col gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accentColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-bold text-white tracking-tight leading-none">{value}</p>
          {sub && (
            <p className={`text-[11px] mt-1.5 font-medium ${subPositive ? "text-emerald-500" : "text-slate-600"}`}>
              {sub}
            </p>
          )}
        </div>
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
        sub={totalIncome > 0 ? "All time" : "No income yet"}
        accentColor="bg-emerald-500/10 text-emerald-400"
        glowColor="bg-emerald-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        }
      />
      <Card
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        sub={expenseRatio ? `${expenseRatio}% of income` : "No expenses yet"}
        accentColor="bg-rose-500/10 text-rose-400"
        glowColor="bg-rose-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        }
      />
      <Card
        label="Net Balance"
        value={formatCurrency(Math.abs(balance))}
        sub={balance < 0 ? "In the red" : balance > 0 ? "Available" : "Break even"}
        subPositive={balance >= 0}
        accentColor={balance < 0 ? "bg-rose-500/10 text-rose-400" : "bg-[var(--accent-subtle)] text-[var(--accent-light)]"}
        glowColor={balance < 0 ? "bg-rose-500" : "bg-[var(--accent)]"}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        }
      />
      <Card
        label="Savings Rate"
        value={totalIncome > 0 ? `${savingsRate.toFixed(1)}%` : "—"}
        sub={totalIncome > 0 ? (savingsRate >= 20 ? "On track" : "Below 20% target") : "No income yet"}
        subPositive={savingsRate >= 20}
        accentColor="bg-cyan-500/10 text-cyan-400"
        glowColor="bg-cyan-500"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
    </div>
  );
}
