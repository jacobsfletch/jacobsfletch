import { combineReducers } from 'redux';
import ScreenReducer from './screens/reducer';
import ClickMe from './screens/reducer-click';

const allReducers = combineReducers({
    mountedScreen: ScreenReducer,
    userClicked: ClickMe
})

export default allReducers
