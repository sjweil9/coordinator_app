export default (state = [], action) => {
  switch(action.type) {
    case 'remove_invite':
      return state.filter(invite => invite.id !== action.payload);
    case 'set_invites':
      return action.payload;
    default:
      return state;
  }
}