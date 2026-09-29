export type Account = {
  id: string;
  name: string;
  type: string;
  details: string;
  amount: string;
  icon: string;
  tone: string;
};

export type AccountActivity = {
  id: string;
  label: string;
  date: string;
  account: string;
  amount: string;
  icon: string;
  tone: string;
  positive?: boolean;
};

export const accounts: Account[] = [
  { id: 'everyday', name: 'Everyday spending', type: 'Primary account', details: '•••• 4820', amount: 'Rp 8.245.600', icon: '$', tone: 'blue' },
  { id: 'rainy-day', name: 'Rainy day fund', type: 'Savings account', details: '•••• 0916', amount: 'Rp 3.178.900', icon: 'S', tone: 'green' },
  { id: 'travel', name: 'Travel fund', type: 'Goal account', details: '•••• 7734', amount: 'Rp 1.216.000', icon: 'G', tone: 'orange' },
];

export const accountActivity: AccountActivity[] = [
  { id: 'salary', label: 'Salary deposit', date: 'Today', account: 'Everyday spending', amount: '+ 6.500.000', icon: '+', tone: 'green', positive: true },
  { id: 'groceries', label: 'Market groceries', date: 'Yesterday', account: 'Everyday spending', amount: '- 326.800', icon: '-', tone: 'red' },
  { id: 'transfer', label: 'Monthly transfer', date: '23 March', account: 'Rainy day fund', amount: '- 500.000', icon: '↔', tone: 'purple' },
];
