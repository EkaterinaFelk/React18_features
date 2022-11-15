import { memo, useEffect } from 'react';
import Disclaimer from './shared/disclaimer/disclaimer';
import PetsList from './components/petsList/petsList';

const ReactLegacyPage = memo(() => {
  useEffect(() => console.log('ReactLegacyPage mount'), []);

  return (
    <>
      <Disclaimer />
      <PetsList />
    </>
  );
});

export default ReactLegacyPage;
