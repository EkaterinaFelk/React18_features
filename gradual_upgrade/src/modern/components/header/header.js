import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { useCallback } from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Badge from '../badge/badge';
import LayoutSwitcher from '../layoutSwitcher/layoutSwitcher';
import { useSelector } from 'react-redux';
import Generator from '../generator/generator';

import './header.css';

export default function Header() {
  const counter = useSelector((state) => state.counter);

  return (
    <header className="app-header">
      <div className="app-header__main">
        <Logo />
        <Menu />
      </div>

      <div className="app-header__actions">
        <Generator />
        <LayoutSwitcher />
        <Badge counter={counter} />
      </div>
    </header>
  );
}
