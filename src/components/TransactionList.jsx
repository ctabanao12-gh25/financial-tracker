import TransactionItem from "./TransactionItem";

function groupByDate(transactions) {
  const groups = {};
  for (const tx of transactions) {
    if (!groups[tx.date]) groups[tx.date] = [];
    groups[tx.date].push(tx);
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

function formatGroupDate(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (dateStr === today.toISOString().slice(0, 10)) return "Today";
  if (dateStr === yesterday.toISOString().slice(0, 10)) return "Yesterday";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function TransactionList({ transactions, onDelete }) {
  const groups = groupByDate(transactions);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60">
        <div>
          <h2 className="text-[13px] font-semibold text-white">Recent Transactions</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">All recorded activity</p>
        </div>
        {transactions.length > 0 && (
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-800/80 border border-slate-700/40 px-2.5 py-1 rounded-lg">
            {transactions.length} {transactions.length === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-700">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-[13px] font-medium text-slate-600">No transactions yet</p>
          <p className="text-[11px] mt-1 text-slate-700">Add your first income or expense above</p>
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto px-2 py-2">
          {groups.map(([date, txs]) => (
            <div key={date} className="mb-1">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  {formatGroupDate(date)}
                </span>
                <div className="flex-1 h-px bg-slate-800/60" />
              </div>
              {txs.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
