import type { Transaction } from '../services/dashboardData';

type TransactionGroupProps = {
  title: string;
  items: Transaction[];
};

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <article className="transaction">
      <span className={`category-icon ${transaction.tone}`} aria-hidden="true">{transaction.icon}</span>
      <div><strong>{transaction.category}</strong><small>{transaction.time}<i className="dot" />{transaction.detail}</small></div>
      <span className="amount">{transaction.amount}</span>
    </article>
  );
}

function TransactionGroup({ title, items }: TransactionGroupProps) {
  const titleId = title.replace(/ /g, '-');

  return (
    <section className="transaction-group" aria-labelledby={titleId}>
      <div className="section-title"><h3 id={titleId}>{title}</h3><button className="more" type="button" aria-label={`More options for ${title}`}>•••</button></div>
      <div className="transactions">{items.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}</div>
    </section>
  );
}

export default TransactionGroup;
