import loginService from "../services/login";

export const storeUser = (user) => async (dispatch) => {
  const data = await loginService.login(user);

  localStorage.setItem("loggedUser", JSON.stringify(data));

  dispatch({ type: "STORE_USER", data });
};

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "STORE_USER":
      return { ...action.data };

    case "CLEAR_USER":
      return null;

    default:
      return state;
  }
};
