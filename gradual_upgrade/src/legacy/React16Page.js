import React from 'react';
import { memo, useEffect, useState } from 'react';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './petsList/petsList';

const React16Page = memo(({ counter, dispatch }) => {
  //const theme = useContext(ThemeContext);

  useEffect(() => console.log('React16Page mount'), []);

  return (
    <>
      <Disclaimer />
      <PetsList />
    </>
  );
});

export default React16Page;
