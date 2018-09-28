const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMjMgMTU6MzY6NDMgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMjkgMDI6MDY6NDIgVVRDIn0.visUgYq1EKsUUsPK7GlKhtWG2ZrUCaiQ53lsnAV_icE';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}