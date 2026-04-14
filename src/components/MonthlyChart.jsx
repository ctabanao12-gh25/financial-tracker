import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../utils/formatters";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="text-slate-300 font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
          <span className="text-slate-400 capitalize">{p.name}:</span>
          <span className="text-white font-medium">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyChart({ data }) {
  const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Monthly Overview</h2>
        <p className="text-xs text-slate-500 mt-0.5">Income vs. expenses — last 6 months</p>
      </div>
      {!hasData ? (
        <div className="flex items-center justify-center h-52 text-slate-600 text-sm">
          Add transactions to see monthly trends
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barCategoryGap="30%" barGap={4}>
            <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="0" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#475569", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#475569", fontSize: 11 }}
              tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: "11px", color: "#64748b", paddingTop: "12px" }}
            />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
