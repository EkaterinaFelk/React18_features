import React from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Badge from '../badge/badge';
import { useSelector } from 'react-redux';

import './header.css';

export default function Header() {
  const counter = useSelector((state) => state);

  return (
    <header className="app-header">
      <Logo />
      <Menu />
      <Badge counter={counter} />
    </header>
  );
}
