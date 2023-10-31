import React from 'react';

export const ScheduleBody = ({ schedules, tableColumnsSchedule }) => {
  return (
    <tbody>
      {schedules?.length > 1 &&
        schedules.map((dataItem, ind) => (
          <tr key={ind}>
            <th scope="row">{dataItem.staff}</th>
            {tableColumnsSchedule.map((day, ind) => (
              <td key={ind}>{dataItem[day]}</td>
            ))}
            <th>{dataItem.total}</th>
          </tr>
        ))}
    </tbody>
  );
};
