import { formatCurrency } from "../utils/formatters";

export default function TopCategories({ data, totalExpenses }) {
  const top = data.slice(0, 6);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Top Categories</h2>
        <p className="text-xs text-slate-500 mt-0.5">Where your money is going</p>
      </div>
      {top.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-slate-600 text-sm">
          No expense data yet
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {top.map((cat) => {
            const pct = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
            return (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.fill }}
                    />
                    <span className="text-sm text-slate-300">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{pct.toFixed(1)}%</span>
                    <span className="text-xs font-semibold text-slate-200 w-20 text-right">
                      {formatCurrency(cat.value)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: cat.fill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
