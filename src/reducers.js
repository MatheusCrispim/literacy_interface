import { combineReducers } from 'redux';
import challengeReducer from './modules/challenge/reducers/reducer';
import contextReducer from './modules/context/reducers/reducer';
import userReducer from './modules/user/reducers/reducer';

export default combineReducers({
    challenge: challengeReducer,
    context: contextReducer,
    user: userReducer,
})