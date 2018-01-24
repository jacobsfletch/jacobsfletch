import { combineReducers } from 'redux'

import PortfolioDataReducer from './reducers/PortfolioDataReducer'
import BlogDataReducer from './reducers/BlogDataReducer'
import DockReducer from './reducers/DockReducer'
import GlobalDataReducer from './reducers/GlobalDataReducer'
import ResumeReducer from './reducers/ResumeReducer'
import RouteReducer from './reducers/RouteReducer'
import WindowReducer from './reducers/WindowReducer'
import PortfolioReducer from './reducers/PortfolioReducer'
import IdReducer from './reducers/IdReducer'
import ScrollReducer from './reducers/ScrollReducer'

const allReducers = combineReducers({
	route: RouteReducer,
	id: IdReducer,
	portfolio: PortfolioDataReducer,
	blog: BlogDataReducer,
	dock: DockReducer,
	globals: GlobalDataReducer,
	resume: ResumeReducer,
	viewportSize: WindowReducer,
	portfolioSize: PortfolioReducer,
	ratioScrolled: ScrollReducer
})

export default allReducers
