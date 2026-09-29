import { useState } from 'react';
import ActivityChart from './components/ActivityChart';
import Sidebar from './components/Sidebar';
import SummaryPanel from './components/SummaryPanel';
import TransactionGroup from './components/TransactionGroup';
import { transactions } from './services/dashboardData';
import './styles/dashboard.css';

type ToastMessage = string | null;

function App() {
  const [activeItem, setActiveItem] = useState('Expenses');
  const [toast, setToast] = useState<ToastMessage>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const selectNav = (label: string) => {
    setActiveItem(label);
    showToast(`${label} selected`);
  };

  return (
    <div className="app-shell">
      <Sidebar activeItem={activeItem} onSelect={selectNav} />
      <main className="workspace">
        <section className="content" aria-labelledby="page-title">
          <header className="content-header">
            <div><p className="eyebrow">01 - 25 March, 2026 <span>•</span> SPRING CYCLE</p><h2 id="page-title">{activeItem}</h2><p className="lede">A clear record of the gold passing through your hands.</p></div>
            <div className="people" aria-label="Shared account members"><span className="person">M</span><span className="person">A</span><span className="person">J</span><button className="add-person" type="button" aria-label="Add account member" onClick={() => showToast('Invite link copied to clipboard.')}>+</button></div>
          </header>
          <ActivityChart />
          <TransactionGroup title="Today" items={transactions.slice(0, 3)} />
          <TransactionGroup title="Monday, 23 March 2026" items={transactions.slice(3)} />
        </section>
        <SummaryPanel onTips={() => showToast('Your personalized saving tips are on the way.')} />
      </main>
      {toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}

export default App;
