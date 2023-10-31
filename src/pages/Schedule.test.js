/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable no-template-curly-in-string */

import { setupServer } from 'msw/node';

import * as hooks from '../hooks/useShifts';

import { handlers } from '../__mocks__/handlers';

import { render } from '../test-utils';

import { getFakeResponse } from '../__mocks__/response';
import Schedule from './Schedule';

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

    const { container } = render(<Schedule />);

    const tableCols = container.querySelector('thead').querySelectorAll('th');

    const tableRows = container.querySelector('tbody').querySelectorAll('tr');

    expect(tableCols.length).toEqual(7); // columns + total
    expect(tableCols[0]).toHaveTextContent(/SCHEDULE/gi);

    expect(tableRows.length).toEqual(5); // names
    expect(tableRows[0]).toHaveTextContent(/james/gi);
  });
});
