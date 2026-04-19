import { formatCurrency } from "../utils/formatters";

export default function TopCategories({ data, totalExpenses }) {
  const top = data.slice(0, 6);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 p-5 h-full">
      <div className="mb-5">
        <h2 className="text-[13px] font-semibold text-white">Top Categories</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Where your money is going</p>
      </div>
      {top.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <p className="text-[13px] text-slate-600">No expense data yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {top.map((cat, i) => {
            const pct = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
            return (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-600 w-4 text-right">{i + 1}</span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.fill }}
                    />
                    <span className="text-[13px] font-medium text-slate-300">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-slate-600 font-medium">{pct.toFixed(1)}%</span>
                    <span
                      className="text-[11px] font-bold tabular-nums min-w-[64px] text-right"
                      style={{ color: cat.fill }}
                    >
                      {formatCurrency(cat.value)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden ml-6">
                  <div
                    className="h-full rounded-full transition-all duration-700"
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
