import { combineReducers } from 'redux';
import AuthTokenReducer from './AuthTokenReducer';
import UserProfileReducer from './UserProfileReducer'
import SelectedScreenReducer from './SelectedScreenReducer';
import UserCreatedListsReducer from './UserCreatedListsReducer';

export default combineReducers({
    authToken: AuthTokenReducer,
    currentUser: UserProfileReducer,
    selectedScreen: SelectedScreenReducer,
    userCreatedLists: UserCreatedListsReducer,
})