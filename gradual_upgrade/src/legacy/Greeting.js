/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { store } from '../store';

import ThemeContext from './shared/ThemeContext';
import Clock from './shared/Clock';

store.subscribe(() => {
  console.log('Counter:', store.getState());
});

class AboutSection extends Component {
  componentDidMount() {
    // The modern app is wrapped in StrictMode,
    // but the legacy bits can still use old APIs.
    findDOMNode(this);
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <div style={{ border: '1px dashed black', padding: 20 }}>
            <h3>src/legacy/Greeting.js</h3>
            <h4 style={{ color: theme }}>
              This component is rendered by the nested React ({React.version}).
            </h4>
            <Clock />
            <p>
              Counter: {this.props.counter}{' '}
              <button onClick={() => this.props.dispatch({ type: 'increment' })}>+</button>
            </p>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

function mapStateToProps(state) {
  return { counter: state };
}

export default connect(mapStateToProps)(AboutSection);
