const initialSettings = {
  pl: "",
  firstLogin: false,
  providers: [],
};

const user = (state = initialSettings, action) => {
  switch (action.type) {
    case "SET_PL":
      return { ...state, pl: action.pl };
    case "SET_FIRST_LOGIN":
      return { ...state, firstLogin: action.firstLogin }; 
    case "SET_PROVIDERS":
      return { ...state, providers: action.providers };
    default:
      return state;
  }
};

export default user;
