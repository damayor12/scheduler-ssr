export const getFakeResponse = () => [
  {
    schedule: 'morning_upStairs',
    mon: { id: 2, user: 'jill', status: true },
    tue: {},
    wed: {},
    thu: {},
    fri: {},
  },
  {
    schedule: 'morning_downStairs',
    mon: {},
    tue: { id: 3, user: 'john', status: true },
    wed: {},
    thu: { id: 3, user: 'john', status: true },
    fri: {},
  },
  {
    schedule: 'morning_parking_lot',
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
  },
  {
    schedule: 'lunch_a',
    mon: {},
    tue: { id: 4, user: 'james', status: true },
    wed: {},
    thu: {},
    fri: {},
  },

  {
    schedule: 'lunch_b',
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
  },
  {
    schedule: 'lunch_c',
    mon: {},
    tue: {},
    wed: {},
    thu: {},
    fri: {},
  },
  {
    schedule: 'lunch_d',
    mon: {},
    tue: {},
    wed: {},
    thu: { id: 2, user: 'jill', status: true },
    fri: {},
  },
  {
    schedule: 'noon_upStairs',
    mon: { id: 3, user: 'john', status: true },
    tue: { id: 3, user: 'john', status: true },
    wed: {},
    thu: { id: 3, user: 'john', status: true },
    fri: {},
  },
  {
    schedule: 'noon_downStairs',
    mon: {},
    tue: { id: 4, user: 'james', status: true },
    wed: {},
    thu: {},
    fri: { id: 3, user: 'john', status: true },
  },
  {
    schedule: 'noon_parking_lot',
    mon: { id: 5, user: 'jake', status: true },
    tue: {},
    wed: {},
    thu: {},
    fri: {},
  },
];
