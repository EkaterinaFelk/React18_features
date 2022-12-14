import React from 'react';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './components/petsList/petsList';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import PetsListWithoutConcurrency from './components/petsList/petsListWithoutConcurrency';

export default function ReactModernPage() {
  return (
    <>
      <Disclaimer />
      <PetsList />
    {/*  <PetsListWithoutConcurrency />  */}
    </>
  );
}
