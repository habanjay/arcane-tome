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
  { label: 'Dashboard', icon: '⌂' },
  { label: 'Expenses', icon: '✦' },
  { label: 'Accounts', icon: '◇' },
  { label: 'Summary', icon: '↗' },
  { label: 'Settings', icon: '⚙' },
];

export const spendingBars = [43, 65, 55, 31, 43, 36, 55, 34, 45, 65, 46, 36, 54, 41, 56, 32, 45, 75, 53, 34, 49, 87, 64];

export const transactions: Transaction[] = [
  { id: 'grocery', category: 'Grocery', detail: 'Belanja di pasar', time: '5:12 pm', amount: '-326.800', icon: '⌁', tone: 'sky' },
  { id: 'transport', category: 'Transportation', detail: 'Naik bus umum', time: '5:12 pm', amount: '-15.000', icon: '▣', tone: 'violet' },
  { id: 'housing', category: 'Housing', detail: 'Bayar Listrik', time: '5:12 pm', amount: '-185.750', icon: '⌂', tone: 'amber' },
  { id: 'food', category: 'Food and Drink', detail: 'Makan Steak', time: '5:12 pm', amount: '-156.000', icon: '⌁', tone: 'coral' },
  { id: 'entertainment', category: 'Entertainment', detail: 'Nonton Bioskop', time: '5:12 pm', amount: '-35.200', icon: '▶', tone: 'green' },
];

export const spendingCategories: SpendingCategory[] = [
  { label: 'Food and Drinks', amount: '872.400', percentage: 32, tone: 'teal' },
  { label: 'Shopping', amount: '1.378.200', percentage: 49, tone: 'gold' },
  { label: 'Housing', amount: '928.500', percentage: 38, tone: 'coral' },
  { label: 'Transportation', amount: '420.700', percentage: 28, tone: 'blue' },
  { label: 'Vehicle', amount: '520.000', percentage: 38, tone: 'violet' },
];
