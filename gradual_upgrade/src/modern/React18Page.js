import React from 'react';
import { useContext, useState, useEffect } from 'react';
import ThemeContext from './shared/ThemeContext';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './petsList/petsList';

export default function React18Page({ counter, dispatch }) {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Disclaimer />
      <PetsList />
    </>
  );
}
