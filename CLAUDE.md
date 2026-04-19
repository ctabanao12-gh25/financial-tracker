# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build (output → dist/)
npm run preview    # serve the dist/ build locally
npm run lint       # ESLint across all .js/.jsx files
```

No test suite is configured. There is no test runner to invoke.

## Architecture

This is a **zero-backend, single-page React app**. All state is kept in memory and persisted to `localStorage`. There is no routing — the entire app is one page.

### State layer — `src/hooks/useTransactions.js`

The single source of truth. This hook owns:
- `transactions[]` — all income/expense records, persisted under `"budget_tracker_transactions"`
- `budgets{}` — monthly budget limits keyed by `"YYYY-MM"`, persisted under `"budget_tracker_budgets"`
- All derived values computed with `useMemo`: `totalIncome`, `totalExpenses`, `balance`, `savingsRate`, `chartData`, `monthlyData`, `currentMonthBudget`, `currentMonthExpenses`
- Mutation functions: `addTransaction`, `deleteTransaction`, `setBudget`

`App.jsx` calls this hook once and passes everything down as props — no Context, no external store.

### Transaction shape

```js
{
  id: string,          // crypto.randomUUID()
  amount: number,      // positive float
  type: "income" | "expense",
  category: string,    // from EXPENSE_CATEGORIES or INCOME_CATEGORIES
  description: string,
  date: string,        // "YYYY-MM-DD"
  createdAt: number    // Date.now(), used for stable sort
}
```

### Shared constants — `src/utils/constants.js`

Single source of truth for category lists and their hex colors (`CATEGORY_COLORS`). Both the chart and the transaction items derive colors from here. Adding a new category means adding it to the relevant array and the color map.

### Styling

Tailwind CSS v3 — pure utility classes, no custom CSS beyond `src/index.css` which sets the dark base (`bg-slate-950`), Inter font, scrollbar styles, and `color-scheme: dark` on date inputs. No `App.css` is used. Tailwind content scanning covers `./index.html` and `./src/**/*.{js,jsx}`.

### Charts

Recharts is the only charting library. `SpendingChart` uses `PieChart` (donut variant via `innerRadius`). `MonthlyChart` uses `BarChart`. Both have custom dark-themed tooltip components defined inline in the same file.

### Dashboard layout (App.jsx)

```
Header (sticky)
SummaryCards        — 4 KPI cards (income / expenses / balance / savings rate)
BudgetProgress      — current-month budget tracker with inline edit
MonthlyChart (3/5) + SpendingChart (2/5)   — lg:grid-cols-5
TransactionForm    + TopCategories          — lg:grid-cols-2
TransactionList
```

## Git & GitHub

A **Stop hook** in `.claude/settings.json` automatically commits and pushes all changes to `origin master` at the end of every session. The commit message format is:

```
Auto-save: session changes YYYY-MM-DD HH:MM
```

- Only tracked files are staged (`git add -u`) — untracked files like `.claude/` internals are never auto-committed.
- No empty commits are created if there are no changes.
- When explicitly asked to commit mid-session, do so immediately with a descriptive message and push — the Stop hook is a safety net, not a replacement.
