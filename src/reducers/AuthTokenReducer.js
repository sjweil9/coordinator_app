const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlN0ZXBoZW4iLCJsYXN0X25hbWUiOiJXZWlsIiwiZW1haWwiOiJzdGVwaGVuLndlaWxAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMTUgMDM6NDA6MTUgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMTYgMTc6MTI6MzcgVVRDIn0.FJ2JTrHcp14Ir252Vt4mtQJRUuQj_N6leO85j-RbL08';

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}