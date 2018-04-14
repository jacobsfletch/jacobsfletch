import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'

import DataReducer from './reducers/data'
import SpecsReducer from './reducers/specs'

const allReducers = combineReducers({
	data: DataReducer,
	specs: SpecsReducer
})

const middleware = applyMiddleware(createLogger())

const store = createStore(allReducers, middleware)

export default store
