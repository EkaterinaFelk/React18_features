import React from 'react';
import loading from '../../../assets/loading.gif';
import './loading.css';

export default function Spinner() {
  return (
    <div className="app-loading">
      {' '}
      <img src={loading} alt="loading" className="app-loading__img" />
    </div>
  );
}
