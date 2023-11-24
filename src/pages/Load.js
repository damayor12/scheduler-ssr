import { useRef, useState } from 'react';

import Table from '../components/Table/Table';

import { useShifts } from '../hooks/useShifts';
import { shuffleShifts } from '../utils/utils';
import { LoadBody } from '../components/TableBody/LoadBody';

function Load() {
  const { dataStatus, shifts, setShifts } = useShifts();

  const timeoutIdRef = useRef();
  const [errorAlert, setErrorAlert] = useState(false);

  const { loading, error } = dataStatus;

  const mainColumnsLoad = shifts.length ? Object.keys(shifts[0]).slice(1) : [];

  const tableColumns = shifts.length ? Object.keys(shifts[0]) : [];

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return shifts ? (
    <div>
      {shifts.length > 1 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h6 style={{ textAlign: 'center' }}>Load</h6>

            <div>
              <button
                onClick={(e) => {
                  setShifts((prev) =>
                    prev.map((item) => {
                      return {
                        schedule: item.schedule,
                        mon: {},
                        tue: {},
                        wed: {},
                        thu: {},
                        fri: {},
                      };
                    }),
                  );
                }}
              >
                clear
              </button>

              <button
                style={{ margin: '1rem' }}
                onClick={() => {
                  const data = shuffleShifts(shifts);

                  if (!data) {
                    setErrorAlert(true);
                    clearTimeout(timeoutIdRef.current);
                    timeoutIdRef.timeId = setTimeout(() => setErrorAlert(false), 5000);
                    return;
                  }

                  setShifts(data);
                }}
              >
                shuffle
              </button>

              {errorAlert && <span style={{ color: 'red' }}>try again</span>}
            </div>
          </div>

          <Table setShifts={setShifts} shifts={shifts} tableColumns={tableColumns}>
            <LoadBody shifts={shifts} tableColumnsLoad={mainColumnsLoad} setShifts={setShifts} />
          </Table>
        </>
      )}

      {shifts.length <= 0 && (
        <span
          style={{
            padding: 10,
            display: 'flex',
            margin: '0 auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          No results found
        </span>
      )}
    </div>
  ) : null;
}

export default Load;
