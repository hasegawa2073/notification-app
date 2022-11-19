import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

function TimePick() {
  const [value, setValue] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="通知する時間"
        value={value}
        onChange={(newValue) => {
          setValue(newValue as any);
          console.log(newValue);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default TimePick;
