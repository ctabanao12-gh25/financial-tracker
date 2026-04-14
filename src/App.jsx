import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import { useProfile } from "./hooks/useProfile";
import { useSavingsGoals } from "./hooks/useSavingsGoals";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import BudgetPage from "./pages/BudgetPage";
import SavingsPage from "./pages/SavingsPage";
import CardsPage from "./pages/CardsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const { profile, initials, updateProfile } = useProfile();
  const { goals, addGoal, updateSaved, deleteGoal } = useSavingsGoals();
  const {
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
  } = useTransactions();

  function renderPage() {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardPage
            transactions={transactions}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            savingsRate={savingsRate}
            chartData={chartData}
            monthlyData={monthlyData}
            currentMonthKey={currentMonthKey}
            currentMonthBudget={currentMonthBudget}
            currentMonthExpenses={currentMonthExpenses}
            setBudget={setBudget}
          />
        );
      case "transactions":
        return (
          <TransactionsPage
            transactions={transactions}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
          />
        );
      case "analytics":
        return (
          <AnalyticsPage
            monthlyData={monthlyData}
            chartData={chartData}
            totalExpenses={totalExpenses}
            totalIncome={totalIncome}
          />
        );
      case "budget":
        return (
          <BudgetPage
            currentMonthKey={currentMonthKey}
            currentMonthBudget={currentMonthBudget}
            currentMonthExpenses={currentMonthExpenses}
            setBudget={setBudget}
            monthlyData={monthlyData}
          />
        );
      case "savings":
        return (
          <SavingsPage
            balance={balance}
            totalIncome={totalIncome}
            savingsRate={savingsRate}
            monthlyData={monthlyData}
            goals={goals}
            onAddGoal={addGoal}
            onUpdateSaved={updateSaved}
            onDeleteGoal={deleteGoal}
          />
        );
      case "cards":
        return <CardsPage />;
      case "investments":
        return <InvestmentsPage />;
      case "settings":
        return (
          <SettingsPage
            profile={profile}
            initials={initials}
            onUpdateProfile={updateProfile}
            transactions={transactions}
            onClearData={clearAll}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100" data-theme={profile.theme || "violet"}>
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        initials={initials}
        avatarGradient={profile.avatarGradient}
        userName={profile.name}
      />

      <div className="flex-1 flex flex-col min-w-0 pl-16 lg:pl-56">
        <Header
          userName={profile.name}
          initials={initials}
          avatarGradient={profile.avatarGradient}
          onOpenSettings={() => setActivePage("settings")}
        />
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-screen-xl mx-auto w-full">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
