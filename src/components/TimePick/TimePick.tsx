import type {} from '@mui/x-date-pickers/themeAugmentation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import styles from './TimePick.module.css';

function TimePick() {
  const now = new Date();
  const [time, setTime] = useState(new Date());
  const [remainTime, setRemainTime] = useState(0);
  const [reserve, setReserve] = useState(false);

  const iconPath = '../../icon.png';
  const imagePath = '../../image.png';

  useEffect(() => {
    const notifyMyApp = () => {
      if (!('Notification' in window)) {
        // eslint-disable-next-line no-alert
        alert('このブラウザは通知に対応していません。');
      } else if (Notification.permission === 'granted') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const notification = new Notification('通知許可ありがとう。', {
          body: '通知アプリ「お時間ですよ。」より',
          image: imagePath,
          icon: iconPath,
          silent: true,
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const notification = new Notification('通知許可ありがとう。', {
              body: '通知アプリ「お時間ですよ。」より',
              image: imagePath,
              icon: iconPath,
              silent: true,
            });
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

  const pushHours = (date: string | number | Date) => new Date(date).getHours();
  const pushMinutes = (date: string | number | Date) =>
    new Date(date).getMinutes();
  const pushTime = (date: string | number | Date) =>
    `${pushHours(date)}:${pushMinutes(date)}`;

  const push = (date: string | number | Date) => {
    setReserve(true);
    const diffTime = new Date(date).getTime() - new Date().getTime();
    const diffTimeSec = Math.floor(diffTime / 1000);
    // eslint-disable-next-line no-new
    new Notification('通知を予約したよ。', {
      body: `このあと${pushTime(date)}に通知するよ。(${diffTimeSec}秒後)`,
      image: imagePath,
      icon: iconPath,
      silent: true,
    });
    setRemainTime(diffTimeSec);

    setTimeout(() => {
      // eslint-disable-next-line no-new
      new Notification('お時間ですよ。', {
        body: `${pushTime(date)}になりました。`,
        image: imagePath,
        icon: iconPath,
        requireInteraction: true,
        silent: true,
      });
      setReserve(false);
    }, diffTime);
  };

  return (
    <div>
      {reserve ? <p>{remainTime}秒後に通知するよ</p> : ''}
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="通知する時間"
            value={time}
            onChange={(newTime) => {
              if (newTime) {
                setTime(newTime);
              }
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {now.getTime() < time.getTime() ? (
        <button
          type="button"
          className={styles.button}
          onClick={() => push(time)}
          onTouchEnd={() => push(time)}
        >
          通知を予約する
        </button>
      ) : (
        <button type="button" className={styles.buttonDisable}>
          未来の時間を指定してね
        </button>
      )}
    </div>
  );
}

export default TimePick;
