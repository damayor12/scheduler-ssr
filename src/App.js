import NavBar from './components/NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Schedule from './pages/Schedule';
import Load from './pages/Load';
import { GlobalStyle } from './styles';
import { ScheduleProvider } from './hooks/useShifts';
import React from 'react';

function App() {
  return (
    <>
      <GlobalStyle />

      <ScheduleProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Load />
          </Route>

          <Route exact path="/schedule">
            <Schedule />
          </Route>
        </Switch>
      </ScheduleProvider>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
}

export default App;
