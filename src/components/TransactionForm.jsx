import { useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";

const inputClass =
  "w-full bg-slate-800/60 border border-slate-700/50 text-slate-100 placeholder-slate-600 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-[var(--accent-border)] hover:border-slate-600/70 transition-all duration-150";

const labelClass = "block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function makeDefaultForm() {
  return {
    amount: "",
    type: "expense",
    category: EXPENSE_CATEGORIES[0],
    description: "",
    date: getToday(),
  };
}

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(makeDefaultForm);
  const [error, setError] = useState("");

  const categories =
    form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(newType) {
    const newCategories =
      newType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setForm((prev) => ({ ...prev, type: newType, category: newCategories[0] }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }
    if (!form.description.trim()) {
      setError("Please enter a description.");
      return;
    }
    setError("");
    onAdd({ ...form, amount });
    setForm({ ...makeDefaultForm(), type: form.type, category: form.category });
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 p-5">
      <div className="mb-5">
        <h2 className="text-[13px] font-semibold text-white">Add Transaction</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Record income or expense</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Type toggle — pill style */}
        <div className="p-1 bg-slate-800/60 rounded-xl border border-slate-700/40 grid grid-cols-2 gap-1">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                form.type === t
                  ? t === "income"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t === "income" ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              )}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div>
          <label className={labelClass}>Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[13px] font-medium">$</span>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className={`${inputClass} pl-7`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Grocery run"
            maxLength={80}
            className={inputClass}
          />
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-rose-500/8 border border-rose-500/20 rounded-xl">
            <svg className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-[11px] text-rose-400 font-medium">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="mt-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] text-white font-semibold py-3 rounded-xl text-[13px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] hover:shadow-lg hover:shadow-[var(--accent-subtle)] active:scale-[0.99]"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
