import axios from "axios";
import cookie from "react-cookies";
import C from "../config/constant"

const client = (token = null) => {
  const defaultOptions = {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : { "Access-Control-Allow-Origin": "*",
          "Accept": "application/json", 
          "x-api-csrf": `${cookie.load(C.COOKIE.CSRF)}`,
          "withCredentials": "true",
          "xsrfHeaderName": "X-CSRFToken" 
        },
  };

  return {
    get: (url, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  };
};

export default client;
