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
          <h2 className="text-lg font-bold text-white">Transactions</h2>
          <p className="text-xs text-slate-500 mt-0.5">All your financial records</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? "Close" : "Add Transaction"}
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Total Records</p>
          <p className="text-2xl font-bold text-white">{transactions.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Income Records</p>
          <p className="text-2xl font-bold text-emerald-400">{incomeCount}</p>
          <p className="text-xs text-slate-600 mt-0.5">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Expense Records</p>
          <p className="text-2xl font-bold text-rose-400">{expenseCount}</p>
          <p className="text-xs text-slate-600 mt-0.5">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-white" : "text-rose-400"}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Add transaction form (collapsible) */}
      {showForm && <TransactionForm onAdd={handleAdd} />}

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by description or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-1.5 flex-shrink-0">
            {["all", "income", "expense"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition ${
                  typeFilter === t
                    ? t === "income"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : t === "expense"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--accent-border)]"
                    : "bg-slate-800 text-slate-500 border border-slate-700/50 hover:text-slate-300"
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
            className="bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
          >
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700/50 text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] transition"
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
        </div>
      </div>

      {/* Transaction list */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-white">
            {hasActiveFilter
              ? `${filtered.length} of ${transactions.length} transactions`
              : `All Transactions (${transactions.length})`}
          </p>
          {hasActiveFilter && (
            <button
              onClick={() => { setSearch(""); setTypeFilter("all"); setCategoryFilter("All"); }}
              className="text-xs text-slate-500 hover:text-slate-300 transition"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-slate-700">
            <svg className="w-10 h-10 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">
              {transactions.length === 0 ? "No transactions yet" : "No results found"}
            </p>
            <p className="text-xs mt-1 text-slate-700">
              {transactions.length === 0
                ? "Use the button above to add your first record"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {filtered.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
