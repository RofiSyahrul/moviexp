import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { initialState, movieReducer } from './movie/reducers';

const rootReducer = combineReducers({ movie: movieReducer });

const composeEnhancer =
  (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  { movie: initialState },
  composeEnhancer(applyMiddleware(thunk))
);

export type State = ReturnType<typeof rootReducer>;

export type BaseAction = ReturnType<typeof store['dispatch']>;

export default store;
