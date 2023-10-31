import { rest } from 'msw';
import { getFakeResponse } from './response';

const mockResponse = rest.get('http://localhost:3031/data', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.delay(500),

    ctx.json({
      '2023-10-25T16': getFakeResponse(),
    }),
  );
});

export const handlers = [mockResponse];
