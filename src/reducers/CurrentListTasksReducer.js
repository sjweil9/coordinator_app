export default (state = [], action) => {
  switch(action.type) {
    case 'set_tasks':
      return action.payload;
    case 'add_task':
      return [...state, action.payload]
    default:
      return state;
  }
}