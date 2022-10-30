import React, { memo, useMemo } from 'react';
import './statusBar.css';

const StatusBar = memo(({ title, value }) => {
  const style = useMemo(
    () => ({
      '--width': `${value}%`
    }),
    [value]
  );

  return (
    <div className="app-status-bar">
      <div className="app-status-bar__title">{title}</div>
      <div className="app-status-bar__bar" style={style}></div>
    </div>
  );
});

export default StatusBar;
