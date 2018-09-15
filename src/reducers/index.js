import { combineReducers } from 'redux';
import AuthTokenReducer from './AuthTokenReducer';
import UserProfileReducer from './UserProfileReducer'

export default combineReducers({
    authToken: AuthTokenReducer,
    currentUser: UserProfileReducer,
})