import { combineReducers } from 'redux'

import PortfolioReducer from './reducers/PortfolioReducer'
import DockReducer from './reducers/DockReducer'
import GlobalsReducer from './reducers/GlobalsReducer'
import ResumeReducer from './reducers/ResumeReducer'

const allReducers = combineReducers({
    portfolio: PortfolioReducer,
    dock: DockReducer,
    globals: GlobalsReducer,
    resume: ResumeReducer
})

export default allReducers
