import React from 'react';
import ReactDOM, { hydrateRoot } from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App tab="home" />
  </BrowserRouter>,
);

reportWebVitals();
