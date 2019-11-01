const loginStart = () => {
  return {
    type: "LOGIN_REQUEST"
  };
};

const loginSuccess = username => {
  return {
    type: "LOGIN_SUCCESS",
    payload: username
  };
};

const loginError = error => {
  return {
    type: "LOGIN_FAILURE",
    payload: error
  };
};

const login = (userService, dispatch) => (username, password) => {
  dispatch(loginStart());
  return userService
    .login(username, password)
    .then(data => dispatch(loginSuccess(username)))
    .catch(err => dispatch(loginError(err)));
};

const nameUpdateStart = () => {
  return {
    type: "NAME_UPDATE_REQUEST"
  };
};

const nameUpdateSuccess = username => {
  return {
    type: "NAME_UPDATE_SUCCESS",
    payload: username
  };
};

const nameUpdateError = error => {
  return {
    type: "NAME_UPDATE_FAILURE",
    payload: error
  };
};

const updateName = (userService, dispatch) => username => {
  dispatch(nameUpdateStart());
  return userService
    .updateName(username)
    .then(data => dispatch(nameUpdateSuccess(username)))
    .catch(err => dispatch(nameUpdateError(err)));
};

export { login, updateName };
