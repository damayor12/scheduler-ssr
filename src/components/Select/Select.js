import React, { useEffect, useState } from 'react';
import { isValidSelection, isValidStaff } from '../../utils/helpers';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getOptions } from '../../utils/users';
import _ from 'lodash';

const StyledSelect = styled.select`
  &:focus {
    border: ${(props) => (props.$error ? 'red 2px solid' : '')};

    outline: ${(props) => (props.$error ? 'red 1px solid' : '')};
  }

  cursor: pointer;
`;

const Select = ({ shifts, shiftDay, schedule, selectedStaffProps, setShifts }) => {
  const [selectedStaff, setSelectedStaff] = useState(selectedStaffProps.user);

  useEffect(() => {
    setSelectedStaff(selectedStaffProps);
  }, [selectedStaffProps]);

  const [errorAlert, setErrorAlert] = useState(false);
  const timeoutIdRef = React.useRef();

  const onOptionChangeHandler = (event) => {
    if (isValidStaff(event.target.value)) {
      if (isValidSelection([...shifts], shiftDay, schedule, event.target.value)) {
        setSelectedStaff(event.target.value);
        setShifts((prevShifts) =>
          prevShifts.map((itemObj) => {
            if (itemObj.schedule === schedule) {
              itemObj[shiftDay] = getOptions().find(
                (userObj) => userObj.user === event.target.value,
              );
              return itemObj;
            }
            return itemObj;
          }),
        );
        toast.success(`${event.target.value} successfully registered!`);
      } else {
        setErrorAlert(true);
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.timeId = setTimeout(() => setErrorAlert(false), 5000);
      }
    } else setSelectedStaff('⛔️⛔️');

    console.log('User Selected Value - ', event.target.value);
  };

  return getOptions() ? (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ textAlign: 'left', color: `${errorAlert ? 'red' : 'inherit'}` }}>
        {selectedStaff.user}
      </span>

      <StyledSelect
        value={selectedStaffProps.user || selectedStaff}
        onChange={onOptionChangeHandler}
        style={{ width: '20px' }}
        $error={errorAlert}
        data-testid="select-element"
      >
        <option>choose staff</option>
        {getOptions().length > 1 &&
          getOptions().map((option, index) => {
            return <option key={index}>{option.user}</option>;
          })}
      </StyledSelect>
    </div>
  ) : null;
};

export default Select;
