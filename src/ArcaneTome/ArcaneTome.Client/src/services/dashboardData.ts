export type NavItem = {
  label: string;
  icon: string;
};

export type Transaction = {
  id: string;
  category: string;
  detail: string;
  time: string;
  amount: string;
  icon: string;
  tone: string;
};

export type SpendingCategory = {
  label: string;
  amount: string;
  percentage: number;
  tone: string;
};

export const navItems: NavItem[] = [
  { label: 'Overview', icon: '⌂' },
  { label: 'Expenses', icon: '✦' },
  { label: 'Vaults', icon: '◇' },
  { label: 'Trends', icon: '↗' },
  { label: 'Accounts', icon: '◎' },
  { label: 'Settings', icon: '⚙' },
];

export const spendingBars = [43, 65, 55, 31, 43, 36, 55, 34, 45, 65, 46, 36, 54, 41, 56, 32, 45, 75, 53, 34, 49, 87, 64];

export const transactions: Transaction[] = [
  { id: 'grocery', category: 'Market provisions', detail: 'Herbs, grain, and tea', time: '5:12 pm', amount: '-326.800', icon: '✧', tone: 'sky' },
  { id: 'transport', category: 'Wayfinding', detail: 'Carriage to the city', time: '4:48 pm', amount: '-15.000', icon: '⇢', tone: 'violet' },
  { id: 'housing', category: 'Hearth & home', detail: 'Monthly ward maintenance', time: '11:06 am', amount: '-185.750', icon: '⌂', tone: 'amber' },
  { id: 'food', category: 'Feast & drink', detail: 'Dinner at The Copper Stag', time: '8:22 pm', amount: '-156.000', icon: '◌', tone: 'coral' },
  { id: 'entertainment', category: 'Diversions', detail: 'Theatre of Illusions', time: '7:05 pm', amount: '-35.200', icon: '▶', tone: 'green' },
];

export const spendingCategories: SpendingCategory[] = [
  { label: 'Feast & drink', amount: '872.400', percentage: 32, tone: 'teal' },
  { label: 'Market provisions', amount: '1.378.200', percentage: 49, tone: 'gold' },
  { label: 'Hearth & home', amount: '928.500', percentage: 38, tone: 'coral' },
  { label: 'Wayfinding', amount: '420.700', percentage: 28, tone: 'blue' },
  { label: 'Relics & craft', amount: '520.000', percentage: 38, tone: 'violet' },
];
