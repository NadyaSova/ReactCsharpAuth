const reducer = (state, action) => {
  if (state === undefined) return {};
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        username: action.payload,
        loginError: null
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        username: null,
        loginError: null
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        username: null,
        loginError: action.payload
      };

    case "NAME_UPDATE_SUCCESS":
      return {
        ...state,
        username: action.payload,
        nameError: null
      };
    case "NAME_UPDATE_REQUEST":
      return {
        ...state,
        nameError: null
      };
    case "NAME_UPDATE_FAILURE":
      return {
        ...state,
        nameError: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
