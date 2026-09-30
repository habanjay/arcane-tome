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
  { id: 'everyday', name: 'Everyday spending', type: 'Primary account', details: '•••• 4820', amount: 'CA$8,245.60', icon: '$', tone: 'blue' },
  { id: 'rainy-day', name: 'Rainy day fund', type: 'Savings account', details: '•••• 0916', amount: 'CA$3,178.90', icon: 'S', tone: 'green' },
  { id: 'travel', name: 'Travel fund', type: 'Goal account', details: '•••• 7734', amount: 'CA$1,216.00', icon: 'G', tone: 'orange' },
];

export const accountActivity: AccountActivity[] = [
  { id: 'salary', label: 'Salary deposit', date: 'Today', account: 'Everyday spending', amount: '+ CA$6,500.00', icon: '+', tone: 'green', positive: true },
  { id: 'groceries', label: 'Market groceries', date: 'Yesterday', account: 'Everyday spending', amount: '- CA$326.80', icon: '-', tone: 'red' },
  { id: 'transfer', label: 'Monthly transfer', date: '23 March', account: 'Rainy day fund', amount: '- CA$500.00', icon: '↔', tone: 'purple' },
];
