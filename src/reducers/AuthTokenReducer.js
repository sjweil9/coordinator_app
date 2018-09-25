const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMjMgMTU6MzY6NDMgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMjYgMDM6Mjc6MDIgVVRDIn0.VsSVQ0NUd_rnTgfi8Ed7gUG1CqbsQnGAfljvQy8LMew';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}