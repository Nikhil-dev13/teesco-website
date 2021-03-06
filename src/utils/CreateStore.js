import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { combineReducers } from 'redux';

import UserReducer from '../reducers/User';
import AlertReducer from '../reducers/Alerts'

const RootReducer = combineReducers({
    user: UserReducer,
    alert: AlertReducer
})

const initialState = {};

// add support redux extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the store
export const store = createStore(
    RootReducer,
    initialState,
    composeEnhancers(applyMiddleware(ReduxThunk))
)

