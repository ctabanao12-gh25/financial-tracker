import { formatCurrency, formatDate } from "../utils/formatters";
import { CATEGORY_COLORS } from "../utils/constants";

export default function TransactionItem({ transaction, onDelete }) {
  const { id, amount, type, category, description, date } = transaction;
  const isIncome = type === "income";

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700/50 transition-all group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
        style={{
          backgroundColor: `${CATEGORY_COLORS[category] || "#94a3b8"}18`,
          color: CATEGORY_COLORS[category] || "#94a3b8",
        }}
      >
        {category.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">
          {description || category}
        </p>
        <p className="text-xs text-slate-600 mt-0.5">
          {category} · {formatDate(date)}
        </p>
      </div>
      <span
        className={`text-sm font-semibold flex-shrink-0 ${
          isIncome ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(amount)}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="ml-1 w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
        aria-label="Delete transaction"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
