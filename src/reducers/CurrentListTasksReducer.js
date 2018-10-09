export default (state = [], action) => {
  switch(action.type) {
    case 'set_tasks':
      return action.payload;
    case 'add_task':
      return [...state, action.payload]
    case 'update_task':
      tasks = state.map(task => {
        return task.id == action.payload.id ? action.payload.task : task
      })
      return tasks;
    default:
      return state;
  }
}