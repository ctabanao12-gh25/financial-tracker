import { useState } from "react";

const GOALS_KEY = "budget_tracker_goals";

function loadGoals() {
  try {
    return JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useSavingsGoals() {
  const [goals, setGoals] = useState(loadGoals);

  function saveGoals(next) {
    setGoals(next);
    localStorage.setItem(GOALS_KEY, JSON.stringify(next));
  }

  function addGoal(name, amount) {
    const parsed = parseFloat(amount);
    if (!name.trim() || isNaN(parsed) || parsed <= 0) return;
    saveGoals([
      ...goals,
      { id: crypto.randomUUID(), name: name.trim(), target: parsed, saved: 0 },
    ]);
  }

  function updateSaved(id, raw) {
    const value = Math.max(0, parseFloat(raw) || 0);
    saveGoals(goals.map((g) => (g.id === id ? { ...g, saved: value } : g)));
  }

  function deleteGoal(id) {
    saveGoals(goals.filter((g) => g.id !== id));
  }

  return { goals, addGoal, updateSaved, deleteGoal };
}
