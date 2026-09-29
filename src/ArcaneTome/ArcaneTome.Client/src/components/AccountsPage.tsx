import { useState } from 'react';
import { accountActivity, accounts, type Account } from '../services/accountsData';

type AccountsPageProps = {
  onToast: (message: string) => void;
};

type AccountForm = {
  name: string;
  type: string;
  balance: string;
};

function AccountsPage({ onToast }: AccountsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountForm, setAccountForm] = useState<AccountForm>({ name: '', type: 'Everyday spending', balance: '' });

  const closeModal = () => {
    setIsModalOpen(false);
    setAccountForm({ name: '', type: 'Everyday spending', balance: '' });
  };

  const updateForm = (field: keyof AccountForm, value: string) => {
    setAccountForm((current) => ({ ...current, [field]: value }));
  };

  const addAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();
    onToast(`${accountForm.name} account added.`);
  };

  return (
    <main className="workspace">
      <section className="content accounts-content" aria-labelledby="accounts-page-title">
        <header className="content-header">
          <div><p className="eyebrow">01 - 25 March, 2026</p><h2 id="accounts-page-title">Accounts</h2></div>
          <button className="add-button" type="button" onClick={() => setIsModalOpen(true)}><span aria-hidden="true">+</span> ADD ACCOUNT</button>
        </header>
        <div className="balance"><div><p className="balance-label">Total balance across accounts</p><strong>Rp 12.640.500</strong></div><span className="change">+ 8.2% this month</span></div>
        <div className="section-title"><h3>Connected accounts</h3><button className="more" type="button" aria-label="More account options" onClick={() => onToast('Account actions opened.')}>•••</button></div>
        <div className="account-list">{accounts.map((account) => <AccountCard key={account.id} account={account} />)}</div>
        <div className="section-title"><h3>Recent account activity</h3><button className="more" type="button" aria-label="More activity options" onClick={() => onToast('Activity actions opened.')}>•••</button></div>
        <div className="activity">{accountActivity.map((activity) => <article className="activity-row" key={activity.id}><span className={`activity-icon ${activity.tone}`} aria-hidden="true">{activity.icon}</span><div><strong>{activity.label}</strong><small>{activity.date}<i className="dot" />{activity.account}</small></div><span className={`amount ${activity.positive ? 'positive' : ''}`}>{activity.amount}</span></article>)}</div>
      </section>
      <aside className="summary accounts-summary" aria-labelledby="savings-title">
        <h3 id="savings-title">Savings progress</h3>
        <div className="summary-card"><span>Rainy day fund goal</span><strong>Rp 3.178.900</strong><div className="progress"><span /></div><small>68% of Rp 4.650.000 goal</small></div>
        <div className="tip-card"><h4>Build your safety net</h4><p>You are getting closer to your emergency fund goal. Keep a little aside each payday.</p><button type="button" onClick={() => onToast('Your personalized saving tips are on the way.')}>VIEW SAVING TIPS</button></div>
      </aside>
      <AccountModal isOpen={isModalOpen} accountForm={accountForm} onChange={updateForm} onClose={closeModal} onSubmit={addAccount} />
    </main>
  );
}

function AccountCard({ account }: { account: Account }) {
  return <article className="account"><span className={`account-icon ${account.tone}`} aria-hidden="true">{account.icon}</span><div><strong>{account.name}</strong><small>{account.type}<i className="dot" />{account.details}</small></div><span className="account-amount">{account.amount}</span></article>;
}

type AccountModalProps = {
  isOpen: boolean;
  accountForm: AccountForm;
  onChange: (field: keyof AccountForm, value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function AccountModal({ isOpen, accountForm, onChange, onClose, onSubmit }: AccountModalProps) {
  return <div className={`modal ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="modal-panel" onSubmit={onSubmit}><div className="modal-head"><h3>Add a new account</h3><button className="close" type="button" aria-label="Close dialog" onClick={onClose}>×</button></div><label htmlFor="account-name">ACCOUNT NAME<input id="account-name" required value={accountForm.name} onChange={(event) => onChange('name', event.target.value)} placeholder="e.g. Emergency fund" /></label><label htmlFor="account-type">ACCOUNT TYPE<select id="account-type" value={accountForm.type} onChange={(event) => onChange('type', event.target.value)}><option>Everyday spending</option><option>Savings</option><option>Goal</option></select></label><label htmlFor="account-balance">STARTING BALANCE<input id="account-balance" type="number" min="0" value={accountForm.balance} onChange={(event) => onChange('balance', event.target.value)} placeholder="0" /></label><div className="modal-actions"><button className="cancel" type="button" onClick={onClose}>CANCEL</button><button className="save" type="submit">ADD ACCOUNT</button></div></form></div>;
}

export default AccountsPage;
