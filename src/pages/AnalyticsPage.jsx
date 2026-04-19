import MonthlyChart from "../components/MonthlyChart";
import SpendingChart from "../components/SpendingChart";
import TopCategories from "../components/TopCategories";
import { formatCurrency } from "../utils/formatters";

export default function AnalyticsPage({
  monthlyData,
  chartData,
  totalExpenses,
}) {
  const nonEmptyIncome = monthlyData.filter((d) => d.income > 0);
  const nonEmptyExpenses = monthlyData.filter((d) => d.expenses > 0);

  const avgMonthlyIncome =
    nonEmptyIncome.length > 0
      ? nonEmptyIncome.reduce((s, d) => s + d.income, 0) / nonEmptyIncome.length
      : 0;
  const avgMonthlyExpenses =
    nonEmptyExpenses.length > 0
      ? nonEmptyExpenses.reduce((s, d) => s + d.expenses, 0) / nonEmptyExpenses.length
      : 0;

  const bestIncomeMonth = monthlyData.reduce(
    (max, d) => (d.income > max.income ? d : max),
    { income: 0, label: "—" }
  );
  const highestExpenseMonth = monthlyData.reduce(
    (max, d) => (d.expenses > max.expenses ? d : max),
    { expenses: 0, label: "—" }
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Analytics</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Detailed breakdown of your finances</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Avg Monthly Income</p>
          <p className="text-xl font-bold text-emerald-400 tracking-tight">{formatCurrency(avgMonthlyIncome)}</p>
          <p className="text-[11px] text-slate-600 mt-1.5 font-medium">Last 6 months</p>
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Avg Monthly Spend</p>
          <p className="text-xl font-bold text-rose-400 tracking-tight">{formatCurrency(avgMonthlyExpenses)}</p>
          <p className="text-[11px] text-slate-600 mt-1.5 font-medium">Last 6 months</p>
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Best Income Month</p>
          <p className="text-xl font-bold text-white tracking-tight">{bestIncomeMonth.label}</p>
          {bestIncomeMonth.income > 0 && (
            <p className="text-[11px] text-emerald-400 mt-1.5 font-semibold">{formatCurrency(bestIncomeMonth.income)}</p>
          )}
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Highest Expense Month</p>
          <p className="text-xl font-bold text-white tracking-tight">{highestExpenseMonth.label}</p>
          {highestExpenseMonth.expenses > 0 && (
            <p className="text-[11px] text-rose-400 mt-1.5 font-semibold">{formatCurrency(highestExpenseMonth.expenses)}</p>
          )}
        </div>
      </div>

      {/* Monthly chart — full width */}
      <MonthlyChart data={monthlyData} />

      {/* Spending breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <SpendingChart data={chartData} totalExpenses={totalExpenses} />
        </div>
        <div className="lg:col-span-3">
          <TopCategories data={chartData} totalExpenses={totalExpenses} />
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800/60">
          <h3 className="text-[13px] font-semibold text-white">Monthly Breakdown</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Income vs expenses per month</p>
        </div>
        {monthlyData.every((d) => d.income === 0 && d.expenses === 0) ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <p className="text-[13px] text-slate-600 font-medium">Add transactions to see monthly data</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest border-b border-slate-800/60">
                  <th className="text-left px-5 py-3">Month</th>
                  <th className="text-right px-5 py-3">Income</th>
                  <th className="text-right px-5 py-3">Expenses</th>
                  <th className="text-right px-5 py-3">Net</th>
                </tr>
              </thead>
              <tbody>
                {[...monthlyData].reverse().map((row) => {
                  const net = row.income - row.expenses;
                  return (
                    <tr key={row.key} className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors last:border-0">
                      <td className="px-5 py-3.5 text-slate-300 font-semibold">{row.label}</td>
                      <td className="px-5 py-3.5 text-right text-emerald-400 font-semibold tabular-nums">
                        {row.income > 0 ? formatCurrency(row.income) : <span className="text-slate-700">—</span>}
                      </td>
                      <td className="px-5 py-3.5 text-right text-rose-400 font-semibold tabular-nums">
                        {row.expenses > 0 ? formatCurrency(row.expenses) : <span className="text-slate-700">—</span>}
                      </td>
                      <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${net > 0 ? "text-emerald-400" : net < 0 ? "text-rose-400" : "text-slate-600"}`}>
                        {net !== 0 ? `${net > 0 ? "+" : ""}${formatCurrency(net)}` : <span className="text-slate-700">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
