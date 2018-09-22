export default (state = [], action) => {
  switch(action.type) {
    case 'set_tasks':
      return action.payload;
    default:
      return state;
  }
}