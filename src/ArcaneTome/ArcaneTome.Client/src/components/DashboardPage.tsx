import { useState } from 'react';

type DashboardPageProps = {
  onToast: (message: string) => void;
};

const monthlyBars = [58, 30, 47, 53, 37, 66, 88, 46, 70, 57, 43, 68];

const recentTransactions = [
  { icon: '◷', name: 'Coffee shop', date: '12 May, 5:40pm', amount: '-CA$25.90', tone: 'negative' },
  { icon: '↩', name: 'Refund for the order', date: '11 May, 2:10pm', amount: 'CA$340.80', tone: 'positive' },
  { icon: '▤', name: 'Rent payment', date: '11 May, 06:00am', amount: 'CA$1,200.00', tone: 'positive' },
  { icon: '▦', name: 'Grocery store', date: '11 May, 1:55pm', amount: '-CA$743.00', tone: 'negative' },
];

function DashboardPage({ onToast }: DashboardPageProps) {
  const [chartMode, setChartMode] = useState<'Income' | 'Outcome'>('Income');

  return (
    <main className="dashboard-home">
      <header className="dashboard-topbar">
        <div><p className="eyebrow">ARCANE TOME <span>•</span> OVERVIEW</p><h2>Dashboard</h2><p>Manage your payments and transactions in one click.</p></div>
        <div className="dashboard-toolbar"><button className="widget-button" type="button" onClick={() => onToast('Widget library opened.')}><span>+</span> Add widget</button><button className="date-button" type="button" onClick={() => onToast('Date range selected.')}>▣ May 01 - May 15</button></div>
      </header>
      <div className="dashboard-grid">
        <section className="balance-card dashboard-card" aria-labelledby="balance-title">
          <p className="card-label" id="balance-title">Total balance</p><strong className="balance-total">CA$80,300</strong><span className="balance-change">CA$2.4 ↑</span>
          <div className="balance-actions"><button type="button" onClick={() => onToast('Deposit flow opened.')}>Deposit</button><button type="button" onClick={() => onToast('Transfer flow opened.')}>Transfer</button></div>
          <div className="balance-split"><div><span>Main balance</span><strong>CA$73,300</strong></div><div><span>Credit balance</span><strong>CA$5,000</strong></div></div><div className="spent-row"><span>CA$2,000 credit spent</span><b>42%</b></div><div className="spent-bar"><span /></div>
        </section>
        <section className="chart-card dashboard-card" aria-label={`${chartMode} activity by month`}>
          <div className="dashboard-card-header"><div className="segmented" role="group" aria-label="Activity type"><button aria-pressed={chartMode === 'Income'} className={chartMode === 'Income' ? 'active' : ''} type="button" onClick={() => setChartMode('Income')}>Income</button><button aria-pressed={chartMode === 'Outcome'} className={chartMode === 'Outcome' ? 'active' : ''} type="button" onClick={() => setChartMode('Outcome')}>Outcome</button></div><button className="select-button" type="button" onClick={() => onToast('Year filter opened.')}>Year⌄</button></div><div className="dashboard-chart" role="img">{monthlyBars.map((height, index) => <div className="dashboard-bar-wrap" key={index}><span className={`dashboard-bar ${index === 6 ? 'highlight' : ''}`} style={{ height: `${height}%` }} /><small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</small></div>)}</div><div className="chart-scale"><span>CA$100K</span><span>CA$80K</span><span>CA$60K</span><span>CA$40K</span><span>CA$20K</span><span>CA$0</span></div>
        </section>
        <section className="cards-card dashboard-card" aria-labelledby="cards-title"><div className="dashboard-card-header"><h3 id="cards-title">Your cards</h3><button className="round-add" type="button" onClick={() => onToast('New card flow opened.')} aria-label="Add card">+</button></div><article className="bank-card"><div><span>◔</span><small>National Bank</small></div><strong>1253&nbsp; 5432&nbsp; 3521&nbsp; 3090</strong><footer><span>Exp <b>09/24</b></span><i /></footer></article><h3 className="rail-title">Recent transactions</h3><div className="transaction-rail">{recentTransactions.map((transaction) => <article className="rail-transaction" key={transaction.name}><span className="rail-icon">{transaction.icon}</span><div><strong>{transaction.name}</strong><small>{transaction.date}</small></div><b className={transaction.tone}>{transaction.amount}</b></article>)}</div></section>
        <section className="goals-card dashboard-card" aria-labelledby="goals-title"><div className="dashboard-card-header"><h3 id="goals-title">Financial goals</h3><button className="circle-arrow" type="button" onClick={() => onToast('Goals opened.')} aria-label="View financial goals">›</button></div><GoalRow progress="30%" name="Buy Iphone 15" date="May 8, 2024" saved="CA$360" goal="CA$1,200" tone="yellow" /><GoalRow progress="90%" name="Trip to Spain" date="August 16, 2024" saved="CA$3,260" goal="CA$3,600" tone="violet" /></section>
        <section className="spending-card dashboard-card" aria-labelledby="spending-title"><div className="dashboard-card-header"><h3 id="spending-title">Your spending</h3><button className="select-button" type="button" onClick={() => onToast('Month filter opened.')}>Month⌄</button></div><div className="spending-donut"><span>CA$2,840<small>This month</small></span></div><div className="spending-legend"><span><i className="legend-yellow" />Food <b>42%</b></span><span><i className="legend-blue" />Transport <b>28%</b></span><span><i className="legend-red" />Other <b>30%</b></span></div></section>
      </div>
    </main>
  );
}

function GoalRow({ progress, name, date, saved, goal, tone }: { progress: string; name: string; date: string; saved: string; goal: string; tone: string }) {
  return <article className="goal-row"><span className={`goal-progress ${tone}`}>{progress}</span><div><strong>{name}</strong><small>Deadline: {date}</small></div><span><small>Saved</small><b>{saved}</b></span><span><small>Goal</small><b>{goal}</b></span></article>;
}

export default DashboardPage;

