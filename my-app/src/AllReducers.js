import { combineReducers } from 'redux';

import ScreenReducer from './screens/ScreenReducer';
import ProjectsReducer from './ProjectsReducer';

const allReducers = combineReducers({
    mountedScreen: ScreenReducer,
    projects: ProjectsReducer
})

export default allReducers
