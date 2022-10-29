import React from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Badge from '../badge/badge';
import LayoutSwitcher from '../layoutSwitcher/layoutSwitcher';
import { useSelector } from 'react-redux';

import './header.css';

export default function Header() {
  const counter = useSelector((state) => state);

  return (
    <header className="app-header">
      <div className="app-header__main">
        <Logo />
        <Menu />
      </div>

      <div className="app-header__actions">
        <LayoutSwitcher />
        <Badge counter={counter} />
      </div>
    </header>
  );
}
