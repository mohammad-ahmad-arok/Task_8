const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, error: null };
      case "LOGIN_SUCCESS":
        return { ...state, isAuthenticated: true, user: action.payload };
      case "LOGIN_FAILURE":
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export { authReducer };
  