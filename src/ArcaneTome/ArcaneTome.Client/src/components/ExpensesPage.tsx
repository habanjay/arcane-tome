import ActivityChart from './ActivityChart';
import SummaryPanel from './SummaryPanel';
import TransactionGroup from './TransactionGroup';
import { transactions } from '../services/dashboardData';

type ExpensesPageProps = {
  onToast: (message: string) => void;
  onAddExpense: () => void;
  onSavingTips: () => void;
};

function ExpensesPage({ onToast, onAddExpense, onSavingTips }: ExpensesPageProps) {
  return (
    <main className="workspace dashboard-workspace">
      <section className="content dashboard-content" aria-labelledby="page-title">
        <header className="content-header"><div><p className="eyebrow">01 - 25 March, 2026 <span>•</span> MONTHLY OVERVIEW</p><h2 id="page-title">Expenses</h2><p className="lede">Track your spending at a glance.</p></div><div className="people" aria-label="Shared account members"><span className="person">M</span><span className="person">A</span><span className="person">J</span><button className="add-person" type="button" aria-label="Add account member" onClick={() => onToast('Invite link copied to clipboard.')}>+</button></div></header>
        <div className="page-action-row"><span>SPENDING ACTIVITY</span><button className="add-button compact" type="button" onClick={onAddExpense}><span aria-hidden="true">+</span> ADD EXPENSE</button></div>
        <ActivityChart />
        <TransactionGroup title="Today" items={transactions.slice(0, 3)} />
        <TransactionGroup title="Monday, 23 March 2026" items={transactions.slice(3)} />
      </section>
      <SummaryPanel onTips={onSavingTips} />
    </main>
  );
}

export default ExpensesPage;
