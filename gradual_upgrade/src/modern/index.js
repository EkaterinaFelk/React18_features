import React from 'react';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { StrictMode } from 'react';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../store';

//Strict mode renders twice intentionslly - react doc
const RootComponent = () => (
  <>
      <Provider store={store}>
        <App />
      </Provider>
  </>
);

//Discard concurrency
/*ReactDOM.render(<RootComponent />, document.getElementById('root'));*/

const root = createRoot(document.getElementById('root'));
root.render(<RootComponent />);
