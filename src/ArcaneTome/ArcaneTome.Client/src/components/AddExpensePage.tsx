import { useState, type FormEvent } from 'react';

type AddExpensePageProps = { onBack: () => void; onSaved: (message: string) => void };

const categories = [
  { label: 'Grocery', icon: '⌁', tone: 'grocery' },
  { label: 'Transport', icon: '▣', tone: 'transport' },
  { label: 'Housing', icon: '⌂', tone: 'housing' },
  { label: 'Food', icon: '⌁', tone: 'food' },
  { label: 'Fun', icon: '▶', tone: 'entertainment' },
];

function AddExpensePage({ onBack, onSaved }: AddExpensePageProps) {
  const [category, setCategory] = useState(categories[0]);
  const [recurring, setRecurring] = useState(false);
  const [amount, setAmount] = useState('326800');
  const [merchant, setMerchant] = useState('Pasar Minggu');
  const [note, setNote] = useState('');

  const saveExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaved(`${category.label} expense added.`);
  };

  const formattedAmount = Number(amount || 0).toLocaleString('en-CA');

  return <main className="workspace"><section className="content expense-entry" aria-labelledby="add-expense-title"><header className="content-header"><div><p className="eyebrow">25 March, 2026 <span>•</span> New transaction</p><h2 id="add-expense-title">Add expense</h2></div><button className="back-link" type="button" onClick={onBack}>← Back to expenses</button></header><form className="form-panel" onSubmit={saveExpense}><div className="form-row"><div className="field"><label htmlFor="amount">AMOUNT</label><div className="amount-wrap"><span>CA$</span><input id="amount" name="amount" type="number" value={amount} min="0" required onChange={(event) => setAmount(event.target.value)} /></div></div><div className="field"><label htmlFor="date">DATE</label><input id="date" name="date" type="date" defaultValue="2026-03-25" required /></div></div><div className="field"><label>CATEGORY</label><div className="category-picker" role="group" aria-label="Expense category">{categories.map((option) => <button className={`category-option ${category.label === option.label ? 'selected' : ''}`} key={option.label} type="button" onClick={() => setCategory(option)}><span className={`category-icon ${option.tone}`}>{option.icon}</span>{option.label}</button>)}</div></div><div className="field"><label htmlFor="merchant">MERCHANT</label><input id="merchant" name="merchant" type="text" value={merchant} placeholder="Where did you spend?" required onChange={(event) => setMerchant(event.target.value)} /></div><div className="field"><label htmlFor="note">NOTE <span>(OPTIONAL)</span></label><textarea id="note" name="note" value={note} placeholder="Add a little context for this expense..." onChange={(event) => setNote(event.target.value)} /></div><div className="switch-row"><div className="switch-copy"><strong>Recurring expense</strong><span>Repeat this expense automatically each month</span></div><label className="switch"><input type="checkbox" id="recurring" checked={recurring} onChange={(event) => setRecurring(event.target.checked)} /><span className="slider" /></label></div><div className="actions"><button className="save-button" type="submit">SAVE EXPENSE</button><button className="cancel-button" type="button" onClick={onBack}>Cancel</button></div></form></section><aside className="summary expense-preview" aria-labelledby="preview-title"><h3 id="preview-title">Expense preview</h3><div className="balance"><span>Available balance</span><strong>CA$8,245.60</strong><small>+ 12.4% this month</small></div><p className="preview-title">THIS TRANSACTION</p><div className="preview"><div className="preview-head"><span className={`preview-icon ${category.tone}`}>{category.icon}</span><div><strong>{category.label}</strong><small>{merchant || 'Where you spent'}</small></div></div><p className="preview-amount">- CA${formattedAmount}</p></div><div className="note"><strong>Keep it simple</strong>Adding a note makes it easier to remember where your money went when you review your month.</div></aside></main>;
}

export default AddExpensePage;



