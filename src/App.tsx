import { type ReactElement } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { BaseScreen } from './common/components/base-screen/base-screen';
import { screenList } from './common/components/base-screen/screen-enum';
import React from 'react';
import { ScreenTitle } from './common/components/base-screen/base-screen.styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationContext } from './application-context';
import { HttpClient } from './common/http-client/http-client';
import { LoginContainer } from './login/screens/login.container';

function App(): ReactElement {
  return (
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
                  <BaseScreen>
                    <ScreenTitle>{screen.title}</ScreenTitle>
                    <ScreenComponent />
                  </BaseScreen>
                }
              />
            );
          })}
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ApplicationContext.Provider>
  );
}

export default App;
