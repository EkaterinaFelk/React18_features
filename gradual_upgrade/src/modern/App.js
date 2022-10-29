import React from 'react';
import { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ThemeContext from './shared/ThemeContext';
import Layout from './components/layout/layout';
import { ROUTE_URLS } from '../constants/routes';
import React18Page from './React18Page';
import { useEffect, useMemo, memo } from 'react';
import generateData from '../api/generator';
import lazyLegacyRoot from './lazyLegacyRoot';

const App = memo(() => {
  const [theme, setTheme] = useState('list');

  useEffect(() => console.log('App mount'), []);

  //useEffect(() => console.dir(generateData(10)), []);

  const React16Page = useMemo(() => lazyLegacyRoot(() => import('../legacy/React16Page')), []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path={ROUTE_URLS.react18} element={<React18Page />} />
              <Route path={ROUTE_URLS.react16} element={<React16Page />} />
              <Route path={'/'} element={<React16Page />} />
            </Routes>
          </Suspense>
        </Layout>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
});
export default App;

function Spinner() {
  return null;
}
