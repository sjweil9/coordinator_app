import { combineReducers } from 'redux';
import AuthTokenReducer from './AuthTokenReducer';
import UserProfileReducer from './UserProfileReducer'
import SelectedScreenReducer from './SelectedScreenReducer';
import UserCreatedListsReducer from './UserCreatedListsReducer';
import SelectedListReducer from './SelectedListReducer';
import CurrentListTasksReducer from './CurrentListTasksReducer';
import UserInviteReducer from './UserInviteReducer';

export default combineReducers({
    authToken: AuthTokenReducer,
    currentUser: UserProfileReducer,
    selectedScreen: SelectedScreenReducer,
    userCreatedLists: UserCreatedListsReducer,
    selectedList: SelectedListReducer,
    currentListTasks: CurrentListTasksReducer,
    userInvites: UserInviteReducer,
})