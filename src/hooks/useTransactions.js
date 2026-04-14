import { useState, useMemo, useEffect } from "react";
import { STORAGE_KEY, CATEGORY_COLORS } from "../utils/constants";

const BUDGETS_KEY = "budget_tracker_budgets";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function loadBudgets() {
  try {
    const raw = localStorage.getItem(BUDGETS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(loadFromStorage);
  const [budgets, setBudgets] = useState(loadBudgets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  }, [budgets]);

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  function addTransaction({ amount, type, category, description, date }) {
    const newTx = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      type,
      category,
      description,
      date,
      createdAt: Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  function setBudget(monthKey, amount) {
    setBudgets((prev) => ({ ...prev, [monthKey]: parseFloat(amount) || 0 }));
  }

  function clearAll() {
    setTransactions([]);
    setBudgets({});
  }

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const balance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  );

  const savingsRate = useMemo(
    () => (totalIncome > 0 ? Math.max(0, (balance / totalIncome) * 100) : 0),
    [balance, totalIncome]
  );

  const currentMonthBudget = useMemo(
    () => budgets[currentMonthKey] || 0,
    [budgets, currentMonthKey]
  );

  const currentMonthExpenses = useMemo(
    () =>
      transactions
        .filter(
          (tx) => tx.type === "expense" && tx.date.startsWith(currentMonthKey)
        )
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions, currentMonthKey]
  );

  const chartData = useMemo(() => {
    const grouped = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouped)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
        fill: CATEGORY_COLORS[name] || "#94a3b8",
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("en-US", { month: "short" });
      months.push({ key, label, income: 0, expenses: 0 });
    }
    transactions.forEach((tx) => {
      const monthKey = tx.date.slice(0, 7);
      const month = months.find((m) => m.key === monthKey);
      if (month) {
        if (tx.type === "income") month.income += tx.amount;
        else month.expenses += tx.amount;
      }
    });
    return months.map((m) => ({
      ...m,
      income: parseFloat(m.income.toFixed(2)),
      expenses: parseFloat(m.expenses.toFixed(2)),
    }));
  }, [transactions, currentMonthKey]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    clearAll,
    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
    chartData,
    monthlyData,
    currentMonthKey,
    currentMonthBudget,
    currentMonthExpenses,
    setBudget,
  };
}
