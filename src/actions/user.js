import Client from "../config/api";
import C from "../config/constant";
import cookie from "react-cookies";

const endpoint = process.env.REACT_APP_ENDPOINT;

const setLoginSuccess = (isLoginSuccess, currentUser) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGIN_SUCCESS",
      isLoginSuccess,
      currentUser,
    });
  };
};

export const setLoginStatus = (error, loginLoading = false) => {
  return {
    type: "SET_LOGIN_STATUS",
    loginError: error,
    loginLoading: loginLoading,
  };
};

export const loadMe = () => {
  return async (dispatch) => {
    const client = Client();
    try {
      const res = await client.get(`${endpoint}/v3/users?me=true`);
      if (res.data.data && res.data.data.length > 0) {
        dispatch(setLoginSuccess(true, res.data.data[0]));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// User Log in
// -----------------------------------------------------------------------------
export const userLoginRequest = (url, userInfo) => {
  const body = {
    description: C.SESSION.DESCRIPTION,
    responseType: "cookie",
    ttl: C.SESSION.TTL,
    username: userInfo.username,
    password: userInfo.password,
  };

  return async (dispatch) => {
    dispatch(setLoginStatus(null, true));
    const client = Client();
    try {
      await client.post(url, body);
      dispatch(setLoginStatus(null, false));
    } catch (err) {
      dispatch(setLoginStatus(err, false));
    }
  };
};

const logOutSuccess = () => {
  cookie.remove();
  return {
    type: "USER_LOGOUT",
  };
};

export const userLogOutRequest = () => {
  return async (dispatch) => {
    const client = Client(cookie.load(C.COOKIE.TOKEN));
    try {
      await client.post(`${endpoint}/v3/tokens?action=logout`);
      dispatch(logOutSuccess());
    } catch (err) {
      console.log(err);
      dispatch(setLoginStatus(err, false));
    }
  };
};
