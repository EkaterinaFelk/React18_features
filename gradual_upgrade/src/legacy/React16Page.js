import { memo, useEffect } from 'react';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './components/petsList/petsList';

const React16Page = memo(() => {
  useEffect(() => console.log('React16Page mount'), []);

  return (
    <>
      <Disclaimer />
      <PetsList />
    </>
  );
});

export default React16Page;
