import Client from "../config/api";
import C from '../config/constant';

const endpoint = process.env.REACT_APP_ENDPOINT;

const setPL = (pl) => {
  return { type: "SET_PL", pl };
};

const setFirstLogin = (firstLogin) => {
  return { type: "SET_FIRST_LOGIN", firstLogin };
};

const setProviders = (providers) => {
  return { type: "SET_PROVIDERS", providers };
};

export const setHeaderTitle = (title) => {
  return { type: "SET_HEADER_TITLE", title };
};


export const loadSettings = () => {
  return async (dispatch) => {
    const client = Client();
    try {
      const pl = await client.get(`${endpoint}/v3/settings/${ C.SETTING.PL }`);
      const firstLogin = await client.get(`${endpoint}/v3/settings/${ C.SETTING.FIRST_LOGIN }`);
      const providers = await client.get(`${endpoint}/v3-public/authProviders`);
      if (pl)  dispatch(setPL(pl.value));
      if (providers && providers.data.data.length > 0){
        dispatch(setProviders(providers.data.data));
        const settings = {
          provider: providers.data.data[0].id,
          providerLoginLink: providers.data.data[0].actions.login
        } 
        localStorage.setItem("settings", JSON.stringify(settings))
      }
      dispatch(setFirstLogin(firstLogin.value));
    } catch (err) {
      console.log(err);
    }
  };
};
