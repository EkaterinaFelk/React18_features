import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

function pets(state = [], action) {
  switch (action.type) {
    case 'loadPets':
      return action.data.map((pet) => ({ ...pet, totalScore: 100 }));
    case 'setTotalScore':
      return state.map((pet) =>
        pet.id === action.data.id ? { ...pet, totalScore: action.data.totalScore } : pet
      );
    default:
      return state;
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

const reducers = combineReducers({
  counter,
  pets
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...[])));
