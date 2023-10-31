/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable no-template-curly-in-string */
import userEvent from '@testing-library/user-event';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { handlers } from '../../__mocks__/handlers';

import Select from './Select';

import { render } from '../../test-utils';
import * as utils from '../../utils/users';
import * as validators from '../../utils/helpers';

const server = setupServer(...handlers);

describe('Select', () => {
  jest.clearAllMocks();
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterEach(() => {
    cleanup();
    return server.resetHandlers();
  });
  afterAll(() => server.close());

  test('should return null when option is falsy', async () => {
    jest.spyOn(utils, 'getOptions').mockImplementation(() => {
      return null;
    });

    jest.spyOn(utils, 'getDays').mockImplementation(() => {
      return true;
    });
    const mockShifts = [];
    const mockSetShifts = jest.fn();

    const { container } = render(
      <Select
        shifts={mockShifts}
        shiftDay="mon"
        schedule="morning_upStairs"
        selectedStaffProps={{ id: null, user: '⛔️⛔️', status: true }}
        setShifts={mockSetShifts}
      />,
    );

    const SelectElement = container.querySelector('select');

    await waitFor(() => {
      expect(SelectElement).toBeNull();
    });
  });
});
