import React from 'react';
import caution from '../../../assets/caution.png';
import './disclaimer.css';

export default function Disclaimer() {
  return (
    <div className="app-disclaimer">
      <img src={caution} alt="Caution" className="app-disclaimer__img" />
      <p className="app-disclaimer__text">
        This component is rendered by React(<b>{React.version}</b>)
      </p>
    </div>
  );
}
