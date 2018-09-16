export default (state = [], action) => {
  switch(action.type) {
    case 'add_list':
      return [...state, action.payload];
    case 'set_lists':
      return action.payload;
    default:
      return state;
  }
}