/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable no-template-curly-in-string */
import userEvent from '@testing-library/user-event';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import * as hooks from '../hooks/useShifts';

import { handlers } from '../__mocks__/handlers';

import { render } from '../test-utils';

import Load from './Load';
import { getFakeResponse } from '../__mocks__/response';

const server = setupServer(...handlers);

const responses = getFakeResponse();

describe('Load', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays correctly', async () => {
    jest.spyOn(hooks, 'useShifts').mockImplementation(() => {
      return {
        dataStatus: jest.fn(),
        shifts: responses,
        setShifts: jest.fn(),
      };
    });

    const { container } = render(<Load />);

    const tableCols = container.querySelector('thead').querySelectorAll('th');

    const tableRows = container.querySelector('tbody').querySelectorAll('tr');

    expect(tableCols.length).toEqual(6);
    expect(tableCols[0]).toHaveTextContent(/SCHEDULE/gi);

    expect(tableRows.length).toEqual(10);
    expect(tableRows[0]).toHaveTextContent(/morning_upStairs/gi);
  });
});
