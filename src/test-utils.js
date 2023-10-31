// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

function render(
  ui,
  {
    preloadedState,

    route = '/',
    ...renderOptions
  } = {},
) {
  window.history.pushState({}, 'Test Page', route);
  const Wrapper = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
