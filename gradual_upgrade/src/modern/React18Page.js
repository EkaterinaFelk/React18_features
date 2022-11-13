import React from 'react';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './components/petsList/petsList';
import PetsListWithoutConcurrency from './components/petsList/petsListWithoutConcurrency';

export default function React18Page() {
  return (
    <>
      <Disclaimer />
     <PetsList />
     {/* <PetsListWithoutConcurrency /> */}
    </>
  );
}
