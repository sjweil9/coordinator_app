const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwiZmlyc3RfbmFtZSI6IlRvbSIsImxhc3RfbmFtZSI6IlRvbWluZ3RvbiIsImVtYWlsIjoidG9tQHRvbS5jb20iLCJjcmVhdGVkX2F0IjoiMjAxOC0wOS0yOCAwMzoxMTo0MiBVVEMiLCJleHBpcmF0aW9uIjoiMjAxOC0xMC0wNSAwMjo0MDoyMCBVVEMifQ.tnG_uIdPBz1Ptl4N3OfvxLy-nZXP-ZitwBq8AdikrrQ';
// const auth_token = null;

export default (state = auth_token, action) => {
  switch(action.type) {
    case 'set_auth_token':
      return action.payload;
    default:
      return state;
  }
}