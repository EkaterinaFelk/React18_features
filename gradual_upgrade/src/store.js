import { createStore } from 'redux';

function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

export const store = createStore(reducer);
