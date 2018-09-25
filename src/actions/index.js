export const setAuthToken = (token) => {
  return {
    type: 'set_auth_token',
    payload: token,
  }
}

export const movePageForward = (page) => {
  return {
    type: 'move_forward',
    payload: page,
  }
}

export const setCurrentUser = (user) => {
  return {
    type: 'set_current_user',
    payload: user
  }
}

export const addUserCreatedList = (list) => {
  return {
    type: 'add_list',
    payload: list,
  }
}

export const setUserCreatedLists = (lists) => {
  return {
    type: 'set_lists',
    payload: lists,
  }
}

export const setSelectedList = (list_id) => {
  return {
    type: 'set_selected_list',
    payload: list_id,
  }
}

export const setCurrentListTasks = (tasks) => {
  return {
    type: 'set_tasks',
    payload: tasks,
  }
}

export const addCurrentListTask = (task) => {
  return {
    type: 'add_task',
    payload: task
  }
}

export const setUserInvites = (invites) => {
  return {
    type: 'set_invites',
    payload: invites
  }
}

export const removeUserInvite = (invite_id) => {
  return {
    type: 'remove_invite',
    payload: invite_id,
  }
}