type SavingTipsPageProps = {
  onBack: () => void;
};

const tips = [
  { number: '01', title: 'Give every dollar a role', copy: 'Move your planned savings first, then let the rest of the month work around what remains.', tone: 'gold' },
  { number: '02', title: 'Make small leaks visible', copy: 'Review food, transport, and subscription spending once a week before it becomes a surprise.', tone: 'blue' },
  { number: '03', title: 'Keep a quiet reserve', copy: 'Build toward three months of essential expenses in your rainy day fund.', tone: 'teal' },
];

function SavingTipsPage({ onBack }: SavingTipsPageProps) {
  return (
    <main className="saving-tips-page">
      <header className="saving-tips-header">
        <div>
          <p className="eyebrow">ARCANE TOME <span>•</span> YOUR GUIDE</p>
          <h2>Saving tips</h2>
          <p>Simple rituals for making more room in your monthly ledger.</p>
        </div>
        <button className="back-link" type="button" onClick={onBack}>← Back to dashboard</button>
      </header>
      <section className="saving-tips-hero" aria-labelledby="saving-plan-title">
        <div>
          <p className="summary-kicker">THIS MONTH'S FOCUS</p>
          <h3 id="saving-plan-title">Build a steadier<br />safety net.</h3>
          <p>Start with one repeatable habit. Consistency will do more for your reserve than a perfect month.</p>
        </div>
        <div className="saving-tips-hero-stat"><strong>CA$500</strong><span>suggested monthly reserve</span><div><i style={{ width: '42%' }} /></div><small>42% of your current goal</small></div>
      </section>
      <section className="saving-tips-section" aria-labelledby="tips-list-title">
        <div className="saving-tips-section-heading"><div><p className="summary-kicker">A FEW GOOD MOVES</p><h3 id="tips-list-title">Make this month lighter</h3></div><span>3 practices</span></div>
        <div className="saving-tip-list">{tips.map((tip) => <article className="saving-tip" key={tip.number}><span className={`saving-tip-number ${tip.tone}`}>{tip.number}</span><div><h4>{tip.title}</h4><p>{tip.copy}</p></div><span className="saving-tip-arrow" aria-hidden="true">↗</span></article>)}</div>
      </section>
      <aside className="saving-tips-note"><span className="tip-sigil" aria-hidden="true">$</span><div><p className="summary-kicker">A NOTE FROM YOUR TOME</p><p>You do not need to save everything at once. A small amount, set aside often, becomes a dependable kind of magic.</p></div></aside>
    </main>
  );
}

export default SavingTipsPage;
