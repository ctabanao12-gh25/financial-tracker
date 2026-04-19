import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../utils/formatters";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl text-xs">
      <p className="text-slate-400 font-semibold mb-2.5 text-[11px] uppercase tracking-wide">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1.5 last:mb-0">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-400 capitalize text-[11px]">{p.name}</span>
          <span className="text-white font-bold ml-auto pl-4">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyChart({ data }) {
  const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[13px] font-semibold text-white">Monthly Overview</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Last 6 months</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-slate-500 font-medium">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="text-[11px] text-slate-500 font-medium">Expenses</span>
          </div>
        </div>
      </div>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-52 gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-[13px] text-slate-600">Add transactions to see trends</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barCategoryGap="35%" barGap={3}>
            <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="0" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#475569", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#475569", fontSize: 11 }}
              tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
              width={38}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.025)", radius: 4 }} />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[5, 5, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
