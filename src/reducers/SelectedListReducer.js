export default (state = null, action) => {
  switch(action.type) {
    case 'set_selected_list':
      return action.payload;
    default:
      return state;
  }
}