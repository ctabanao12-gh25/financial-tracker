import BudgetProgress from "../components/BudgetProgress";
import { formatCurrency } from "../utils/formatters";

export default function BudgetPage({
  currentMonthKey,
  currentMonthBudget,
  currentMonthExpenses,
  setBudget,
  monthlyData,
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Budget</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Track and manage your monthly spending limits</p>
      </div>

      <BudgetProgress
        monthKey={currentMonthKey}
        budget={currentMonthBudget}
        spent={currentMonthExpenses}
        onSetBudget={setBudget}
      />

      {/* Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          {
            iconBg: "bg-emerald-500/10",
            iconText: "text-emerald-400",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            title: "50/30/20 Rule",
            body: "Allocate 50% of income to needs, 30% to wants, and 20% to savings for a balanced budget.",
          },
          {
            iconBg: "bg-[var(--accent-subtle)]",
            iconText: "text-[var(--accent-light)]",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            title: "Review Weekly",
            body: "Set a budget at the start of each month and check in weekly to stay on track before it's too late.",
          },
          {
            iconBg: "bg-amber-500/10",
            iconText: "text-amber-400",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            ),
            title: "Watch Overspending",
            body: "You'll see a warning at 60% and 80% of your budget limit. Plan ahead to avoid going over.",
          },
        ].map((tip) => (
          <div key={tip.title} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-colors">
            <div className={`w-9 h-9 ${tip.iconBg} rounded-xl flex items-center justify-center mb-3`}>
              <svg className={`w-5 h-5 ${tip.iconText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                {tip.icon}
              </svg>
            </div>
            <p className="text-[13px] font-semibold text-white mb-1.5">{tip.title}</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </div>

      {/* Spending history */}
      {monthlyData.some((d) => d.expenses > 0) && (
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold text-white mb-4">Monthly Spending History</h3>
          <div className="flex flex-col gap-3.5">
            {[...monthlyData].reverse().map((row) => {
              const maxExpenses = Math.max(...monthlyData.map((d) => d.expenses), 1);
              const barPct = (row.expenses / maxExpenses) * 100;
              return (
                <div key={row.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-slate-400">{row.label}</span>
                    <span className={`text-[13px] font-bold tabular-nums ${row.expenses > 0 ? "text-rose-400" : "text-slate-700"}`}>
                      {row.expenses > 0 ? formatCurrency(row.expenses) : "—"}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500/60 rounded-full transition-all duration-500"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                  {currentMonthBudget > 0 && row.expenses > currentMonthBudget && (
                    <p className="text-[11px] text-rose-400 mt-1 font-medium">
                      Over budget by {formatCurrency(row.expenses - currentMonthBudget)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {currentMonthBudget === 0 && (
            <p className="text-[11px] text-slate-600 mt-4">
              Set a monthly budget above to see spending relative to your limit.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
