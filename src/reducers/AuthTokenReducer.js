const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlN0ZXBoZW4iLCJsYXN0X25hbWUiOiJXZWlsIiwiZW1haWwiOiJzdGVwaGVuLndlaWxAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMTgtMDktMTUgMDM6NDA6MTUgVVRDIiwiZXhwaXJhdGlvbiI6IjIwMTgtMDktMjEgMDI6Mjk6MzYgVVRDIn0.gR-p2cKuh5PUiELPqHq0FJEAC56ABeLOU8a6eHndC_U'

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}