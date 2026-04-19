import { formatCurrency, formatDate } from "../utils/formatters";
import { CATEGORY_COLORS } from "../utils/constants";

const CATEGORY_ICONS = {
  Food: "🍔", Rent: "🏠", Transport: "🚗", Entertainment: "🎬",
  Shopping: "🛍️", Healthcare: "💊", Utilities: "⚡", Education: "📚",
  Travel: "✈️", Salary: "💼", Freelance: "💻", Other: "📌",
};

export default function TransactionItem({ transaction, onDelete }) {
  const { id, amount, type, category, description, date } = transaction;
  const isIncome = type === "income";
  const color = CATEGORY_COLORS[category] || "#94a3b8";

  return (
    <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/40 transition-all duration-150 group">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}25`,
        }}
      >
        <span>{CATEGORY_ICONS[category] || category.charAt(0)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-slate-200 truncate leading-tight">
          {description || category}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: `${color}12`, color }}
          >
            {category}
          </span>
          <span className="text-[10px] text-slate-600">·</span>
          <span className="text-[11px] text-slate-600">{formatDate(date)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`text-[13px] font-bold tabular-nums ${
            isIncome ? "text-emerald-400" : "text-slate-300"
          }`}
        >
          {isIncome ? "+" : "-"}{formatCurrency(amount)}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete transaction"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
