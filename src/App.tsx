import { useState, type ReactElement } from 'react';
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationContext } from './application-context';
import { BaseScreen } from './common/components/base-screen/base-screen';
import { screenList } from './common/components/base-screen/screen-enum';
import { HttpClient } from './common/http-client/http-client';
import { LoginContainer } from './login/screens/login.container';
import { store } from './redux/store/store';
import { ScreenTitle } from './common/components/base-screen/components/screen-title/screen-title';

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
                    <BaseScreen>
                      <ScreenTitle
                        screenTitle={
                          secondaryTitle === '' ? screen.title : secondaryTitle
                        }
                      />
                      <ScreenComponent setSecondaryTitle={setSecondaryTitle} />
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
    </Provider>
  );
}

export default App;
