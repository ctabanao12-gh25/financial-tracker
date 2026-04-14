import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Transaction History</h2>
          <p className="text-xs text-slate-500 mt-0.5">All recorded transactions</p>
        </div>
        {transactions.length > 0 && (
          <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-lg">
            {transactions.length} entries
          </span>
        )}
      </div>
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-slate-700">
          <svg className="w-10 h-10 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs mt-1 text-slate-700">Add your first income or expense above</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
          {sorted.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
