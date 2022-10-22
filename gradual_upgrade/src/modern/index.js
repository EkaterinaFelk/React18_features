/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import {store} from '../store';

const root = createRoot(document.getElementById('root'));
root.render(<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</StrictMode>);
