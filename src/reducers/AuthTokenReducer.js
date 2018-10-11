const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlN0ZXBoZW4iLCJsYXN0X25hbWUiOiJXZWlsIiwiZW1haWwiOiJzdGVwaGVuLndlaWxAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMTUgMDM6NDA6MTUgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMTAtMTIgMDM6MDQ6MjQgVVRDIn0.ysYB5xdCQCI3hD1P2BI7LwZs-i9erT5RqkowYWcwXDU';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}