import React from 'react';
import Select from '../Select/Select';
import _ from 'lodash';

export const LoadBody = ({ shifts, tableColumnsLoad, setShifts }) => {
  return (
    <tbody data-testid="load-tablebody">
      {shifts.length > 1 &&
        shifts.map((dataItem, ind) => (
          <tr key={ind}>
            <th scope="row">{dataItem.schedule}</th>
            {tableColumnsLoad.map((day, ind) => (
              <td key={ind}>
                <Select
                  shifts={shifts}
                  shiftDay={day}
                  schedule={dataItem.schedule}
                  selectedStaffProps={
                    _.isEmpty(dataItem[day])
                      ? { id: null, user: '⛔️⛔️', status: true }
                      : dataItem[day]
                  }
                  setShifts={setShifts}
                />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};
