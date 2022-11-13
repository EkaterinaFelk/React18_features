import React from 'react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../store';

//Discard concurrency
/* ReactDOM.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
);
 */
const root = createRoot(document.getElementById('root'));

//Strict mode renders twice intentionslly - react doc
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
