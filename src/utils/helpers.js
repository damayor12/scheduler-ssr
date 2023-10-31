import _ from 'lodash';
import { getOptions } from './users';
import { toast } from 'react-toastify';

export const isValidStaff = (name) => {
  if (!name) return null;

  return getOptions().some((staffItem) => name === staffItem.user);
};

export const isValidSelection = (shifts, shiftDay, schedule, staff, mode) => {
  const disableToast = mode === 'helper';
  return (
    consecutiveShiftIsValid([...shifts], shiftDay, schedule, staff, disableToast) &&
    canSelectShiftInWeek([...shifts], staff, disableToast)
  );
};

export const consecutiveShiftIsValid = (shifts, shiftDay, schedule, staff, disableToast) => {
  const selectedShiftIndex = shifts.findIndex((item) => item.schedule === schedule);

  const prevAndNextArr = [
    shifts[selectedShiftIndex - 1] ? shifts[selectedShiftIndex - 1][shiftDay] : undefined,
    shifts[selectedShiftIndex + 1] ? shifts[selectedShiftIndex + 1][shiftDay] : undefined,
  ];

  const validPrevAndNextArr = prevAndNextArr.filter((item) => !!item);

  const isDuplicated = validPrevAndNextArr.some((item) => item.user === staff);

  if (isDuplicated) {
    if (!disableToast) {
      toast.error(`Cannot Select Consecutive Shifts for ${staff}`);
    }
    return false;
  }
  return true;
};

export const getOverallCountByDay = (schedules, shiftDay, staff) => {
  return schedules.reduce((acc, curr) => {
    return curr[shiftDay] && curr[shiftDay].user === staff ? (acc = acc + 1) : acc;
  }, 0);
};

export const canSelectShiftInWeek = (schedules, staff, disableToast) => {
  const overallCount = schedules.reduce((acc, curr) => {
    const countPerSchedule = Object.entries(curr).reduce(
      (p, [key, value]) => (value && value.user === staff ? (p = p + 1) : p),
      0,
    );

    return countPerSchedule > 0 ? (acc = acc + countPerSchedule) : acc;
  }, 0);

  if (overallCount > 6) {
    if (!disableToast) {
      toast.error(`Enough ddShifts for ${disableToast} ${staff} the week`);
    }
    if (!disableToast) return false;
  } else return true;
};
