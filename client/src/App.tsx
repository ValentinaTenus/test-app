import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

import { Tokens } from './bundles/auth/api/auth-token.service';
import { Auth } from './bundles/auth/pages/auth/auth';
import { actions as authActions } from './bundles/auth/store';
import { PrivateRoute, PublicRoute } from './bundles/common/components/components';
import { AppRoute } from './bundles/common/enums/app-routes.enum';
import { useAppSelector, useAppDispatch } from './bundles/common/hooks/hooks';
import { Header } from './bundles/header/header';
import { OpenDeals } from './bundles/open-deals/pages/open-deals/open-deals';
import { MainPage } from './bundles/pages/main-page/main-page';
import styles from './styles.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const hasToken = Cookies.get(Tokens.ACCESS_TOKEN) !== undefined;

  useEffect(() => {
    if (hasToken) {
      void dispatch(authActions.getUser());
    }
  }, [hasToken, dispatch]);

  return (
    <Router>
      <Routes>
          <Route
            path={AppRoute.ROOT}
            element={<Layout/>}
          >
            <Route index element={<MainPage />} />
            <Route
              path={AppRoute.ROOT}
              element={<PublicRoute/>}
            >
              <Route path={AppRoute.LOG_IN} element={<Auth />} />
              <Route path={AppRoute.SIGN_UP} element={<Auth />} />
            </Route>
          </Route>
          <Route
            path={AppRoute.OPEN_DEALS}
            element={<PrivateRoute/>}
          >
            <Route index element={<OpenDeals />} />
          </Route>
        </Routes>
    </Router>
  );
};

function Layout() {
  const { user } = useAppSelector(state => ({
    user: state.auth.user
  }));

  const dispatch = useAppDispatch();

  const handleUserLogout = useCallback(
    () => dispatch(authActions.logout()),
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <Header
            user={user}
            onUserLogout={handleUserLogout}
      />
      <Outlet />
    </div>
  );
}


export { App };

