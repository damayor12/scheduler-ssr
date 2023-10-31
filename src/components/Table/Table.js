import React from 'react';

import { StyledTable } from '../../styles';

const Table = ({ tableColumns, children }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {tableColumns.length > 1 &&
            tableColumns.map((colName, ind) => (
              <th scope="col" key={ind}>
                <span>{colName}</span>
              </th>
            ))}
        </tr>
      </thead>

      {children}
    </StyledTable>
  );
};

export default Table;
