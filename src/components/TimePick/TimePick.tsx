import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import styles from './TimePick.module.css';

function TimePick() {
  const [time, setTime] = useState(new Date());
  const [remainTime, setRemainTime] = useState(0);
  const [reserve, setReserve] = useState(false);

  useEffect(() => {
    const notifyMyApp = () => {
      if (!('Notification' in window)) {
        // eslint-disable-next-line no-alert
        alert('このブラウザは通知に対応していません。');
      } else if (Notification.permission === 'granted') {
        const notification = new Notification('通知許可ありがとう。');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification('通知許可ありがとう。');
          }
        });
      }
    };
    notifyMyApp();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [remainTime]);

  const pushHours = (date: any) => new Date(date).getHours();
  const pushMinutes = (date: any) => new Date(date).getMinutes();
  const pushTime = (date: any) => `${pushHours(date)}:${pushMinutes(date)}`;

  const push = (date: any) => {
    setReserve(true);
    const diffTime = new Date(date).getTime() - new Date().getTime();
    const diffTimeSec = Math.floor(diffTime / 1000);
    // eslint-disable-next-line no-new
    new Notification(
      `このあと${pushTime(date)}に通知するよ。(${diffTimeSec}秒後)`
    );
    setRemainTime(diffTimeSec);

    setTimeout(() => {
      // eslint-disable-next-line no-new
      new Notification(`お時間ですよ。${pushTime(date)}になりました。`);
      setReserve(false);
    }, diffTime);
  };

  return (
    <div>
      {reserve ? <p>{remainTime}秒後に通知します</p> : ''}
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="通知する時間"
            value={time}
            onChange={(newTime) => {
              setTime(newTime as any);
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => push(time)}
      >
        通知を予約する
      </button>
    </div>
  );
}

export default TimePick;
