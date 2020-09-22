import Client from "../config/api";

const endpoint = process.env.REACT_APP_ENDPOINT;

export const loadLocales = (language, version) => {
  return async (dispatch) => {
    const client = Client();
    try {
      const res = await client.get(
        `${endpoint}/translations/${language}.json?${version}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
};
