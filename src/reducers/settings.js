const initialSettings = {
  pl: "",
  firstLogin: false,
  providers: [],
  headerTitle: 'Clusters'
};

const user = (state = initialSettings, action) => {
  switch (action.type) {
    case "SET_PL":
      return { ...state, pl: action.pl };
    case "SET_FIRST_LOGIN":
      return { ...state, firstLogin: action.firstLogin }; 
    case "SET_PROVIDERS":
      return { ...state, providers: action.providers };
    case "SET_HEADER_TITLE":
      return { ...state, headerTitle: action.title };
    default:
      return state;
  }
};

export default user;
