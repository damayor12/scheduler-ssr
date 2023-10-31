import React from 'react';

import { ScheduleBody } from '../components/TableBody/ScheduleBody';
import { useShifts } from '../hooks/useShifts';
import { getSchedules } from '../utils/utils';
import Table from '../components/Table/Table';

const Schedule = () => {
  const { shifts } = useShifts();

  const schedules = getSchedules(shifts);

  const tableColumns = shifts.length > 1 ? [...Object.keys(shifts[0]), 'total'] : [];
  const coreColumns = shifts.length > 1 ? Object.keys(shifts[0]).slice(1) : [];

  return shifts.length ? (
    <>
      <h6 style={{ textAlign: 'center' }}>Schedule</h6>

      <Table tableColumns={tableColumns}>
        <ScheduleBody schedules={schedules} tableColumnsSchedule={coreColumns} />
      </Table>
    </>
  ) : null;
};

export default Schedule;
