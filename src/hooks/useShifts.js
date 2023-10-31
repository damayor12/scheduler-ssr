import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useFetch } from './useFetch';

const ScheduleContext = createContext();

const ScheduleProvider = ({ children, url }) => {
  const { data, error, loading, isSuccess } = useFetch();

  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setShifts(data['2023-10-25T16']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const memoizedProviderValue = useMemo(
    () => ({
      dataStatus: { data, error, loading },
      shifts,
      setShifts,

      // helpers: { consecutiveShiftIsValid },
    }),
    [setShifts, data, error, loading, shifts],
  );

  return (
    <ScheduleContext.Provider value={memoizedProviderValue}>{children}</ScheduleContext.Provider>
  );
};

function useShifts() {
  const context = useContext(ScheduleContext);

  if (context === 'undefined') {
    throw new Error('useSchedules must be used within a ScheduleContext Provider');
  }

  return context;
}

export { useShifts, ScheduleProvider };
