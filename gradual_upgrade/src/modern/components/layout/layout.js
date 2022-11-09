import React from 'react';
import Header from '../header/header';

import './layout.css';

export default function Layout(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-content">{props.children}</main>
    </div>
  );
}
