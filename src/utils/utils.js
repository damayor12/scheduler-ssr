import _ from 'lodash';
import { getDays, getOptions } from './users';
import { toast } from 'react-toastify';
import { canSelectShiftInWeek, getOverallCountByDay, isValidSelection } from './helpers';

export const shuffleShifts = (shifts) => {
  const shiftsReMapped = shifts.reduce((acc, curr) => {
    const schedule = Object.values(curr)[0];
    const mappedShiftPerSchedule = Object.entries(curr)
      .slice(1)
      .map(([key, val]) => {
        return {
          [key]: { val, schedule },
        };
      });

    acc.push(mappedShiftPerSchedule);

    return acc;
  }, []);

  const arrayOfAvailableShifts = shiftsReMapped
    .flat()
    .map((item) => {
      return Object.values(Object.values(item)[0].val).length ? undefined : item;
    })
    .filter((item) => !!item);

  const shuffledArrOfAvailableShifts = _.shuffle(arrayOfAvailableShifts);

  const staffWithoutEnoughShifts = getOptions().filter((staffObj) =>
    canSelectShiftInWeek(shifts, staffObj.user, true),
  );

  let fakeShifts = [...shifts];

  let flag = false;

  let shuffledArrOfAvailableShiftsOptions = [...shuffledArrOfAvailableShifts];

  for (const staffObj of staffWithoutEnoughShifts) {
    let flag = false;
    for (let i = 0; i < shuffledArrOfAvailableShiftsOptions.length; i++) {
      const currentObj = shuffledArrOfAvailableShiftsOptions[i];

      if (
        isValidSelection(
          [...shifts],
          Object.keys(currentObj)[0],
          Object.values(currentObj)[0].schedule,
          staffObj.user,
          'helper',
        )
      ) {
        fakeShifts = fakeShifts.map((itemObj) => {
          if (itemObj.schedule === Object.values(currentObj)[0].schedule) {
            itemObj[Object.keys(currentObj)[0]] = staffObj;

            return itemObj;
          }
          return itemObj;
        });

        flag = true;
        shuffledArrOfAvailableShiftsOptions = shuffledArrOfAvailableShiftsOptions
          .slice(0, i)
          .concat(shuffledArrOfAvailableShiftsOptions.slice(i + 1));
        break;
      }
    }

    if (flag === false) {
      toast.error('Shuffle not possible');
      return undefined;
    }
  }

  toast.success('Success!');
  return fakeShifts;
};

export const getSchedules = (shifts) => {
  return shifts
    ? getOptions().map((userObj) => {
        const temp = {};
        if (getDays().length > 0) {
          getDays().forEach((day) => {
            temp[day] = getOverallCountByDay(shifts, day, userObj.user);
          });
        }
        return {
          staff: userObj.user,
          ...temp,
          total: Object.values(temp).reduce((acc, curr) => acc + curr, 0),
        };
      })
    : null;
};
