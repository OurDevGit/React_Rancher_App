const initialUserData = {
  isAuthenticated: false,
  loginError: null,
  loginLoading: false,
  isLoginSuccess: false,
  currentUser: null
};

const user = (state = initialUserData, action) => {
  switch (action.type) {
    case "SET_LOGIN_SUCCESS":
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess,
        currentUser: action.currentUser,
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loginError: action.loginError,
        loginLoading: action.loginLoading
      };
    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: {},
        isLoginSuccess: false
      };
    default:
      return state;
  }
};

export default user;
