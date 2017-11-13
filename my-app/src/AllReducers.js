import { combineReducers } from 'redux'

import ScreenReducer from './components/screens/ScreenReducer'
import PortfolioReducer from './reducers/PortfolioReducer'
import DockReducer from './reducers/DockReducer'

const allReducers = combineReducers({
    mountedScreen: ScreenReducer,
    portfolio: PortfolioReducer,
    dock: DockReducer
})

export default allReducers
