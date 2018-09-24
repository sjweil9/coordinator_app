const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMjMgMTU6MzY6NDMgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMjUgMDM6Mjc6NDYgVVRDIn0.Rjxfqo2hX2pZZOpOz3o_nwJlT1Wpzbl4_7evkhA381w';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}