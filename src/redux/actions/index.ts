export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (user: any) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error: any) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
