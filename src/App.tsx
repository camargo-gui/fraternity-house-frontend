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

function App(): ReactElement {
  return (
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
        <Route path="/" element={<Navigate to="/fichas" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
