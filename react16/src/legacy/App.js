import React from 'react';
import { useEffect, memo } from 'react';
import React16Page from './React16Page';

const App = memo(() => {
  useEffect(() => console.log('App mount'), []);

  return <React16Page />;
});
export default App;
