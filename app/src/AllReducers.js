import { combineReducers } from 'redux'

import PortfolioReducer from './reducers/PortfolioReducer'
import DockReducer from './reducers/DockReducer'

const allReducers = combineReducers({
    portfolio: PortfolioReducer,
    dock: DockReducer
})

export default allReducers
