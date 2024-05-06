import { useState, type ReactElement } from 'react';
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationContext } from './application-context';
import { BaseScreen } from './common/components/base-screen/base-screen';
import { ScreenTitle } from './common/components/base-screen/components/screen-title/screen-title';
import { screenList } from './common/components/base-screen/screen-enum';
import { HttpClient } from './common/http-client/http-client';
import { LoginContainer } from './login/screens/login/login.container';
import { ResetPasswordContainer } from './login/screens/reset-password/reset-password.container';
import { store } from './redux/store/store';

import { type RoleEnum } from './login/services/interfaces/role';

function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

function PrivateRoute({
  children,
  allowedRoles,
}: {
  children: ReactElement;
  allowedRoles: RoleEnum[] | undefined;
}): ReactElement {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    logout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles?.includes(role as RoleEnum)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App(): ReactElement {
  const [secondaryTitle, setSecondaryTitle] = useState<string>('');

  return (
    <Provider store={store}>
      <ApplicationContext.Provider value={{ httpClient: new HttpClient() }}>
        <ToastContainer />
        <Router>
          <Routes>
            {screenList.map((screen) => {
              const ScreenComponent = screen.element;
              return (
                <Route
                  key={screen.title}
                  path={screen.route}
                  element={
                    <PrivateRoute allowedRoles={screen.allowedRoles}>
                      <BaseScreen>
                        <ScreenTitle
                          screenTitle={
                            secondaryTitle === ''
                              ? screen.title
                              : secondaryTitle
                          }
                        />
                        <ScreenComponent
                          setSecondaryTitle={setSecondaryTitle}
                        />
                      </BaseScreen>
                    </PrivateRoute>
                  }
                />
              );
            })}
            <Route path="/login" element={<LoginContainer />} />
            <Route
              path="/reset-password"
              element={<ResetPasswordContainer />}
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ApplicationContext.Provider>
    </Provider>
  );
}

export default App;
