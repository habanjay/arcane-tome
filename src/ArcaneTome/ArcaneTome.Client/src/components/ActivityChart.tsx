import { spendingBars } from '../services/dashboardData';

function ActivityChart() {
  return (
    <div className="chart" aria-label="Daily spending activity" role="img">
      {spendingBars.map((height, index) => <span className={`bar ${index === 21 ? 'highlight' : ''}`} key={`${height}-${index}`} style={{ height: `${height}%` }} />)}
    </div>
  );
}

export default ActivityChart;
