const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlN0ZXBoZW4iLCJsYXN0X25hbWUiOiJXZWlsIiwiZW1haWwiOiJzdGVwaGVuLndlaWxAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMTUgMDM6NDA6MTUgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMTAtMDMgMDM6NDk6MjUgVVRDIn0.NF6-L7FoHC9CEE6Ui5AmvbDPsnUoXqpGDDhpSqu8CF4';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}