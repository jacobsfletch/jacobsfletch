import { combineReducers } from 'redux'

import PortfolioReducer from './reducers/PortfolioReducer'
import DockReducer from './reducers/DockReducer'
import GlobalsReducer from './reducers/GlobalsReducer'
import ResumeReducer from './reducers/ResumeReducer'
import RouteReducer from './reducers/RouteReducer'
import WindowReducer from './reducers/WindowReducer'

const allReducers = combineReducers({
    route: RouteReducer,
    portfolio: PortfolioReducer,
    dock: DockReducer,
    globals: GlobalsReducer,
    resume: ResumeReducer,
    windowSize: WindowReducer
})

export default allReducers
