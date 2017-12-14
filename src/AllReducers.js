import { combineReducers } from 'redux'

import PortfolioDataReducer from './reducers/PortfolioDataReducer'
import DockReducer from './reducers/DockReducer'
import GlobalDataReducer from './reducers/GlobalDataReducer'
import ResumeReducer from './reducers/ResumeReducer'
import RouteReducer from './reducers/RouteReducer'
import WindowReducer from './reducers/WindowReducer'
import PortfolioReducer from './reducers/PortfolioReducer'

const allReducers = combineReducers({
    route: RouteReducer,
    portfolio: PortfolioDataReducer,
    dock: DockReducer,
    globals: GlobalDataReducer,
    resume: ResumeReducer,
    viewportSize: WindowReducer,
    portfolioSize: PortfolioReducer
})

export default allReducers
