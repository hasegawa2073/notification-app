import React from 'react';
import styles from './App.module.css';
import TimePick from './components/TimePick/TimePick';

function App() {
  return (
    <div className={styles.layout}>
      <TimePick />
    </div>
  );
}

export default App;
