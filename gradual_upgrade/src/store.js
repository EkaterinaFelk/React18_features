import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

//#region Action Creators
export const createLoadPetsAction = (data) => {
  return { type: 'loadPets', data };
};
export const createLoadingStartPetsAction = () => {
  return { type: 'loadingStart' };
};
export const createLoadingFinishPetsAction = () => {
  return { type: 'loadingFinish' };
};
export const createIncrementAction = () => {
  return { type: 'increment' };
};
//#endregion Action Creators

function pets(state = { data: [], loading: false }, action) {
  switch (action.type) {
    case 'loadingStart':
      return { ...state, loading: true };
    case 'loadingFinish':
      return { ...state, loading: false };
    case 'loadPets':
      return {
        ...state,
        data: action.data.map((pet) => ({ ...pet, totalScore: 100 }))
      };
    case 'setTotalScore':
      return {
        ...state,
        data: state.data.map((pet) =>
          pet.id === action.data.id ? { ...pet, totalScore: action.data.totalScore } : pet
        )
      };
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
