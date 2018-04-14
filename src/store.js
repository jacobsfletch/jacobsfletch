import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'

import DataReducer from './reducers/DataReducer'
import PortfolioSizeReducer from './reducers/PortfolioSizeReducer'
import DockReducer from './reducers/DockReducer'
import RouteReducer from './reducers/RouteReducer'
import WindowReducer from './reducers/WindowReducer'
import IdReducer from './reducers/IdReducer'
import ScrollReducer from './reducers/ScrollReducer'

const allReducers = combineReducers({
	route: RouteReducer,
	id: IdReducer,
	data: DataReducer,
	dock: DockReducer,
	viewportSize: WindowReducer,
	portfolioSize: PortfolioSizeReducer,
	ratioScrolled: ScrollReducer
})

const middleware = applyMiddleware(createLogger())

const store = createStore(allReducers, middleware)

export default store
