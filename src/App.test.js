/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-template-curly-in-string */
import { act, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { handlers } from './__mocks__/handlers';
import { render } from './test-utils';

const server = setupServer(...handlers);

jest.mock('axios', () => ({
  __esModule: true,
  get: jest.fn(() => Promise.resolve({ data: 'data' })),
  default: jest.fn(() => Promise.resolve({ data: 'data' })),
}));

describe('Home', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('renders App', async () => {
    render(<App />);

    const MatchedLoadElements = await screen.findAllByText(/Load/i);

    const LoadHeader = MatchedLoadElements[0];

    await waitFor(() => {
      expect(LoadHeader).toBeInTheDocument();
    });
  });
});
