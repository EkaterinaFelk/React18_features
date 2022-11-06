import React, { memo } from 'react';
import './statusBar.css';

const StatusBar = memo(({ title, value }) => {
  return (
    <div className="app-status-bar">
      <div className="app-status-bar__title">{title}</div>
      <div
        className="app-status-bar__bar"
        style={{
          '--width': `${value.toFixed()}%`
        }}
      ></div>
    </div>
  );
});

export default StatusBar;
