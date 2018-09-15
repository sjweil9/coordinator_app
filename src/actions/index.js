export const setAuthToken = (token) => {
  return {
    type: 'set_auth_token',
    payload: token,
  }
}