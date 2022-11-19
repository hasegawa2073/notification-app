import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styles from './TimePick.module.css';

function TimePick() {
  const [time, setTime] = useState();

  return (
    <div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="通知する時間"
            value={time}
            onChange={(newTime) => {
              setTime(newTime as any);
              console.log(newTime);
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <button type="button" className={styles.button}>
        通知する
      </button>
    </div>
  );
}

export default TimePick;
