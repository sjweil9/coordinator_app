export default (state = ['user_lists'], action) => {
  switch(action.type) {
    case 'move_forward':
      return [...state, action.payload]
    default:
      return state;
  }
}