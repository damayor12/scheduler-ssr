import NavBar from './components/NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles';
import { ScheduleProvider } from './hooks/useShifts';
import React from 'react';
const Load = React.lazy(() => import('./pages/Load'));

const Schedule = React.lazy(() => import('./pages/Schedule'));

function App() {
  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    <>
      <GlobalStyle />

      <ScheduleProvider>
        <React.Suspense fallback={<>Loading..</>}>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Load />
            </Route>

            <Route exact path="/schedule">
              <Schedule />
            </Route>
          </Switch>
        </React.Suspense>
      </ScheduleProvider>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
}

export default App;
