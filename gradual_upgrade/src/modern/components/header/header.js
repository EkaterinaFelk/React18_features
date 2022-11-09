import React from 'react';
import { useCallback } from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Badge from '../badge/badge';
import LayoutSwitcher from '../layoutSwitcher/layoutSwitcher';
import { useSelector } from 'react-redux';
import { addPets } from '../../../api/api';
import generateData from '../../../api/generator';

import './header.css';

export default function Header() {
  const counter = useSelector((state) => state.counter);

  const handleGenerateData = useCallback(() => {
    const data = generateData(100);
    const generatePets = async () => {
      await addPets(data);
    };
    generatePets();
  }, []);

  return (
    <header className="app-header">
      <div className="app-header__main">
        <Logo />
        <Menu />
      </div>

      <div className="app-header__actions">
        <div className="app-header__generator" onClick={handleGenerateData}>
          Generate Data
        </div>
        <LayoutSwitcher />
        <Badge counter={counter} />
      </div>
    </header>
  );
}
