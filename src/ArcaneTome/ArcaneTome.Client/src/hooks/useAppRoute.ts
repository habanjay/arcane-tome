import { useEffect, useState } from 'react';

export type AppRoute =
  | '/dashboard'
  | '/expenses'
  | '/expenses/add'
  | '/summary'
  | '/accounts'
  | '/settings'
  | '/settings/photo'
  | '/settings/password'
  | '/saving-tips'
  | '/login'
  | '/create-account'
  | '/404';

const knownRoutes = new Set<AppRoute>([
  '/dashboard', '/expenses', '/expenses/add', '/summary', '/accounts', '/settings',
  '/settings/photo', '/settings/password', '/saving-tips', '/login', '/create-account', '/404',
]);

function getRoute(): AppRoute {
  const path = window.location.pathname;
  if (path === '/') return '/dashboard';
  const route = path as AppRoute;
  return knownRoutes.has(route) ? route : '/404';
}

export function useAppRoute() {
  const [route, setRoute] = useState<AppRoute>(getRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextRoute: AppRoute) => {
    window.history.pushState({}, '', nextRoute);
    setRoute(nextRoute);
  };

  return { route, navigate };
}
