import MonthlyChart from "../components/MonthlyChart";
import SpendingChart from "../components/SpendingChart";
import TopCategories from "../components/TopCategories";
import { formatCurrency } from "../utils/formatters";

export default function AnalyticsPage({
  monthlyData,
  chartData,
  totalExpenses,
  totalIncome,
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
        <h2 className="text-lg font-bold text-white">Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Detailed breakdown of your finances</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Avg Monthly Income</p>
          <p className="text-xl font-bold text-emerald-400">{formatCurrency(avgMonthlyIncome)}</p>
          <p className="text-xs text-slate-600 mt-1">Over last 6 months</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Avg Monthly Spend</p>
          <p className="text-xl font-bold text-rose-400">{formatCurrency(avgMonthlyExpenses)}</p>
          <p className="text-xs text-slate-600 mt-1">Over last 6 months</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Best Income Month</p>
          <p className="text-xl font-bold text-white">{bestIncomeMonth.label}</p>
          {bestIncomeMonth.income > 0 && (
            <p className="text-xs text-emerald-400 mt-1">{formatCurrency(bestIncomeMonth.income)}</p>
          )}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Highest Expense Month</p>
          <p className="text-xl font-bold text-white">{highestExpenseMonth.label}</p>
          {highestExpenseMonth.expenses > 0 && (
            <p className="text-xs text-rose-400 mt-1">{formatCurrency(highestExpenseMonth.expenses)}</p>
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Monthly Breakdown</h3>
        {monthlyData.every((d) => d.income === 0 && d.expenses === 0) ? (
          <p className="text-center text-slate-600 text-sm py-8">Add transactions to see monthly data</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left pb-3 font-medium">Month</th>
                  <th className="text-right pb-3 font-medium">Income</th>
                  <th className="text-right pb-3 font-medium">Expenses</th>
                  <th className="text-right pb-3 font-medium">Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {[...monthlyData].reverse().map((row) => {
                  const net = row.income - row.expenses;
                  return (
                    <tr key={row.key} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 text-slate-300 font-medium">{row.label}</td>
                      <td className="py-3 text-right text-emerald-400 font-medium">
                        {row.income > 0 ? formatCurrency(row.income) : "—"}
                      </td>
                      <td className="py-3 text-right text-rose-400 font-medium">
                        {row.expenses > 0 ? formatCurrency(row.expenses) : "—"}
                      </td>
                      <td className={`py-3 text-right font-bold ${net > 0 ? "text-emerald-400" : net < 0 ? "text-rose-400" : "text-slate-600"}`}>
                        {net !== 0 ? `${net > 0 ? "+" : ""}${formatCurrency(net)}` : "—"}
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
