import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

import allReducers from './AllReducers';

const middleware = applyMiddleware(createLogger())

export default createStore(allReducers, middleware)
