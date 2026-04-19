import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../utils/formatters";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, fill } = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-3.5 py-2.5 shadow-2xl text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fill }} />
        <span className="text-slate-300 font-semibold text-[11px]">{name}</span>
      </div>
      <p className="text-white font-bold text-sm">{formatCurrency(value)}</p>
    </div>
  );
}

export default function SpendingChart({ data, totalExpenses }) {
  const top5 = data.slice(0, 5);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 p-5 h-full">
      <div className="mb-5">
        <h2 className="text-[13px] font-semibold text-white">Spending Breakdown</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Expenses by category</p>
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-52 gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <p className="text-[13px] text-slate-600">Add expenses to see breakdown</p>
        </div>
      ) : (
        <>
          <div className="relative">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={top5}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={80}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {top5.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total</p>
              <p className="text-[15px] font-bold text-white tracking-tight">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            {top5.map((entry) => {
              const pct = totalExpenses > 0 ? ((entry.value / totalExpenses) * 100).toFixed(0) : 0;
              return (
                <div key={entry.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
                    <span className="text-slate-400 font-medium">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{pct}%</span>
                    <span className="text-slate-300 font-semibold tabular-nums">{formatCurrency(entry.value)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
