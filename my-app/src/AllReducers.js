import { combineReducers } from 'redux'

import ScreenReducer from './screens/ScreenReducer'
import ProjectsReducer from './ProjectsReducer'
import DockReducer from './reducers/DockReducer'

const allReducers = combineReducers({
    mountedScreen: ScreenReducer,
    projects: ProjectsReducer,
    dock: DockReducer
})

export default allReducers
