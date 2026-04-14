import BalanceHero from "../components/BalanceHero";
import SummaryCards from "../components/SummaryCards";
import BudgetProgress from "../components/BudgetProgress";
import MonthlyChart from "../components/MonthlyChart";
import SpendingChart from "../components/SpendingChart";
import TopCategories from "../components/TopCategories";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function DashboardPage({
  transactions,
  addTransaction,
  deleteTransaction,
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
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-2">
          <BalanceHero balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} />
        </div>
        <div className="xl:col-span-3">
          <SummaryCards
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            savingsRate={savingsRate}
          />
        </div>
      </div>

      <BudgetProgress
        monthKey={currentMonthKey}
        budget={currentMonthBudget}
        spent={currentMonthExpenses}
        onSetBudget={setBudget}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <MonthlyChart data={monthlyData} />
        </div>
        <div className="lg:col-span-2">
          <SpendingChart data={chartData} totalExpenses={totalExpenses} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TransactionForm onAdd={addTransaction} />
        <TopCategories data={chartData} totalExpenses={totalExpenses} />
      </div>

      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}
