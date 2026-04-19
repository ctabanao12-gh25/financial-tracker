import { useState, useMemo } from "react";
import TransactionItem from "../components/TransactionItem";
import TransactionForm from "../components/TransactionForm";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import { formatCurrency } from "../utils/formatters";

const ALL_CATEGORIES = ["All", ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export default function TransactionsPage({
  transactions,
  onAdd,
  onDelete,
  totalIncome,
  totalExpenses,
  balance,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [showForm, setShowForm] = useState(false);

  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expenseCount = transactions.filter((t) => t.type === "expense").length;

  const filtered = useMemo(() => {
    let txs = [...transactions];
    if (search.trim()) {
      const q = search.toLowerCase();
      txs = txs.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") txs = txs.filter((tx) => tx.type === typeFilter);
    if (categoryFilter !== "All") txs = txs.filter((tx) => tx.category === categoryFilter);
    txs.sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      return b.createdAt - a.createdAt;
    });
    return txs;
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);

  const hasActiveFilter = search || typeFilter !== "all" || categoryFilter !== "All";

  function handleAdd(tx) {
    onAdd(tx);
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Transactions</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">All your financial records</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 hover:shadow-md hover:shadow-[var(--accent-subtle)]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? "Close" : "Add Transaction"}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Total Records</p>
          <p className="text-2xl font-bold text-white tracking-tight">{transactions.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Income</p>
          <p className="text-2xl font-bold text-emerald-400 tracking-tight">{incomeCount}</p>
          <p className="text-[11px] text-emerald-500/70 mt-1 font-medium">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Expenses</p>
          <p className="text-2xl font-bold text-rose-400 tracking-tight">{expenseCount}</p>
          <p className="text-[11px] text-rose-500/70 mt-1 font-medium">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/80 transition-colors">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">Net Balance</p>
          <p className={`text-2xl font-bold tracking-tight ${balance >= 0 ? "text-white" : "text-rose-400"}`}>
            {formatCurrency(Math.abs(balance))}
          </p>
          {balance !== 0 && (
            <p className={`text-[11px] mt-1 font-medium ${balance >= 0 ? "text-emerald-500/70" : "text-rose-500/70"}`}>
              {balance >= 0 ? "Available" : "In the red"}
            </p>
          )}
        </div>
      </div>

      {/* Add transaction form (collapsible) */}
      {showForm && <TransactionForm onAdd={handleAdd} />}

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search transactions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl pl-9 pr-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] hover:border-slate-600/70 transition-all duration-150"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-1 flex-shrink-0 p-1 bg-slate-800/60 border border-slate-700/40 rounded-xl">
            {["all", "income", "expense"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 ${
                  typeFilter === t
                    ? t === "income"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                      : t === "expense"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/25"
                      : "bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--accent-border)]"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] hover:border-slate-600/70 transition-all duration-150"
          >
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800/60 border border-slate-700/50 text-slate-300 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] hover:border-slate-600/70 transition-all duration-150"
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
        </div>
      </div>

      {/* Transaction list */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
          <p className="text-[13px] font-semibold text-white">
            {hasActiveFilter
              ? `${filtered.length} of ${transactions.length} transactions`
              : `All Transactions (${transactions.length})`}
          </p>
          {hasActiveFilter && (
            <button
              onClick={() => { setSearch(""); setTypeFilter("all"); setCategoryFilter("All"); }}
              className="text-[11px] font-semibold text-slate-500 hover:text-[var(--accent-light)] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[13px] font-medium text-slate-600">
                {transactions.length === 0 ? "No transactions yet" : "No results found"}
              </p>
              <p className="text-[11px] mt-1 text-slate-700">
                {transactions.length === 0
                  ? "Use the button above to add your first record"
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-2 py-2">
            {filtered.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
