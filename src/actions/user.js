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

export const loadMe = () => {
  return async (dispatch) => {
    const client = Client();
    try {
      const res = await client.get(`${endpoint}/v3/users?me=true`);
      dispatch(setLoginSuccess(true, res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setLoginStatus = (error, loginLoading = false) => {
  return {
    type: "SET_LOGIN_STATUS",
    loginError: error,
    loginLoading: loginLoading,
  };
};

// User Log in
// -----------------------------------------------------------------------------
export const userLoginRequest = (url, userInfo) => {
  const body = {
    description: C.SESSION.DESCRIPTION,
    responseType: "json",
    ttl: C.SESSION.TTL,
    username: userInfo.username,
    password: userInfo.password,
  };

  return async (dispatch) => {
    dispatch(setLoginStatus(null, true));
    const client = Client();
    try {
      const res = await client.post(url, body);
      dispatch(setLoginStatus(null, false));
      cookie.save(C.COOKIE.TOKEN, res.data.token)
      return res.data
    } catch (err) {
      dispatch(setLoginStatus(err.false));
    }
  };
};

const logOutSucess = () => {
  cookie.remove();
  return {
    type: "USER_LOGOUT",
  };
};

export const logOutRequest = () => {
  return async (dispatch) => {
    const client = Client(cookie.load(C.COOKIE.TOKEN));
    try {
      await client.post(`${endpoint}/v3/tokens?action=logout`);
      dispatch(logOutSucess());
    } catch (err) {
      console.log(err);
    }
  };
};
