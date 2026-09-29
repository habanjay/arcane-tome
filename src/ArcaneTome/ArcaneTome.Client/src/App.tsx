import { useState } from 'react';
import AccountsPage from './components/AccountsPage';
import AddExpensePage from './components/AddExpensePage';
import AuthPages from './components/AuthPages';
import DashboardPage from './components/DashboardPage';
import ExpensesPage from './components/ExpensesPage';
import NotFoundPage from './components/NotFoundPage';
import SettingsPage from './components/SettingsPage';
import Sidebar from './components/Sidebar';
import SummaryPage from './components/SummaryPage';
import { useAppRoute, type AppRoute } from './hooks/useAppRoute';
import './styles/dashboard.css';

type ToastMessage = string | null;

const navigationRoutes: Record<string, AppRoute> = {
  Dashboard: '/dashboard', Expenses: '/expenses', Accounts: '/accounts', Summary: '/summary', Settings: '/settings',
};

function App() {
  const { route, navigate } = useAppRoute();
  const [toast, setToast] = useState<ToastMessage>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  };

  const go = (nextRoute: AppRoute) => navigate(nextRoute);
  const activeItem = route === '/dashboard' ? 'Dashboard' : route === '/accounts' ? 'Accounts' : route === '/summary' ? 'Summary' : route.startsWith('/settings') ? 'Settings' : 'Expenses';
  const isPublicPage = route === '/login' || route === '/create-account' || route === '/404';

  let page: React.ReactNode;
  switch (route) {
    case '/dashboard': page = <DashboardPage onToast={showToast} />; break;
    case '/summary': page = <SummaryPage onToast={showToast} />; break;
    case '/accounts': page = <AccountsPage onToast={showToast} />; break;
    case '/expenses/add': page = <AddExpensePage onBack={() => go('/expenses')} onSaved={showToast} />; break;
    case '/settings': page = <SettingsPage onNavigate={go} onToast={showToast} />; break;
    case '/settings/photo': page = <SettingsPage mode="photo" onNavigate={go} onToast={showToast} />; break;
    case '/settings/password': page = <SettingsPage mode="password" onNavigate={go} onToast={showToast} />; break;
    case '/login': page = <AuthPages mode="login" onNavigate={go} onToast={showToast} />; break;
    case '/create-account': page = <AuthPages mode="create" onNavigate={go} onToast={showToast} />; break;
    case '/404': page = <NotFoundPage onHome={() => go('/expenses')} />; break;
    default: page = <ExpensesPage onToast={showToast} onAddExpense={() => go('/expenses/add')} />;
  }

  if (isPublicPage) return <>{page}{toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}</>;

  return <div className="app-shell"><Sidebar activeItem={activeItem} onSelect={(label) => go(navigationRoutes[label])} />{page}{toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}</div>;
}

export default App;
