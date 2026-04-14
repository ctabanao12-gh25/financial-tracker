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
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 shadow-xl text-xs">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fill }} />
        <span className="text-slate-300 font-semibold">{name}</span>
      </div>
      <p className="text-white font-bold">{formatCurrency(value)}</p>
    </div>
  );
}

function CustomLegend({ data }) {
  return (
    <div className="flex flex-col gap-1.5 mt-3">
      {data.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
            <span className="text-slate-400">{entry.name}</span>
          </div>
          <span className="text-slate-300 font-medium">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingChart({ data, totalExpenses }) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Spending Breakdown</h2>
        <p className="text-xs text-slate-500 mt-0.5">Expenses by category</p>
      </div>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-52 text-slate-600 text-sm">
          Add expenses to see breakdown
        </div>
      ) : (
        <>
          <div className="relative">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-sm font-bold text-white">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
          <CustomLegend data={data} />
        </>
      )}
    </div>
  );
}
