const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlN0ZXBoZW4iLCJsYXN0X25hbWUiOiJXZWlsIiwiZW1haWwiOiJzdGVwaGVuLndlaWxAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMTUgMDM6NDA6MTUgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMjggMDM6MjI6NTIgVVRDIn0.naYsziUYc5WXoI1zvd36gN8qJ21e1Fa3C__XTlbH-MU';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}