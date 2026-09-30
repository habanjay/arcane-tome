import { spendingCategories } from '../services/dashboardData';

type SummaryPanelProps = {
  onTips: () => void;
};

function SummaryPanel({ onTips }: SummaryPanelProps) {
  return (
    <aside className="summary dashboard-summary" aria-labelledby="summary-title">
      <p className="summary-kicker">MONTHLY SPENDING</p>
      <h3 id="summary-title">Where your<br />money goes</h3>
      {spendingCategories.map((category) => (
        <div className="category" key={category.label}>
          <div className="category-line"><span>{category.label}</span><span>{category.amount}</span></div>
          <div className="progress"><span className={category.tone} style={{ width: `${category.percentage}%` }} /></div>
        </div>
      ))}
      <div className="tip-card">
        <div className="tip-sigil" aria-hidden="true">$</div>
        <div className="tip-copy"><p className="tip-label">MONEY TIP</p><h4>Save more money</h4><p>Set aside a small reserve before the next cycle begins.</p></div>
        <button type="button" onClick={onTips}>VIEW TIPS <span aria-hidden="true">↗</span></button>
      </div>
    </aside>
  );
}

export default SummaryPanel;
