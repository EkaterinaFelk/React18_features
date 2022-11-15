import React from 'react';
import { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeContext from './shared/ThemeContext';
import Layout from './components/layout/layout';
import { ROUTE_URLS } from '../constants/routes';
import { useEffect, useMemo, memo } from 'react';
import lazyLegacyRoot from './lazyLegacyRoot';
import Spinner from './shared/loading/loading';

const App = memo(() => {
  const [theme, setTheme] = useState('grid');

  useEffect(() => console.log('App mount'), []);

  const ReactLegacyPage = useMemo(() => lazyLegacyRoot(() => import('../legacy/ReactLegacyPage')), []);
  const ReactModernPage = React.lazy(() => import('../modern/ReactModernPage'));

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path={ROUTE_URLS.reactModern} element={<ReactModernPage />} />
              <Route path={ROUTE_URLS.reactLegacy} element={<ReactLegacyPage />} />
              <Route path={'/'} element={<ReactModernPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
});
export default App;
