/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {useState, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ThemeContext from './shared/ThemeContext';

export default function App() {
  const [theme, setTheme] = useState('slategrey');

  function handleToggleClick() {
    if (theme === 'slategrey') {
      setTheme('hotpink');
    } else {
      setTheme('slategrey');
    }
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div style={{fontFamily: 'sans-serif'}}>
          <div
            style={{
              margin: 20,
              padding: 20,
              border: '1px solid black',
              minHeight: 300,
            }}>
            <button onClick={handleToggleClick}>Toggle Theme Context</button>
            <br />
            <Suspense fallback={<Spinner />}>
            
              <Routes>
                    <Route path={"/about"} element={<AboutPage />} />
                    <Route path={"/"} element={<HomePage />} />
              </Routes>
           
            </Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

function Spinner() {
  return null;
}
