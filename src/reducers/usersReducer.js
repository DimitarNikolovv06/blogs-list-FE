import usersService from "../services/users";

export const initUsers = () => async (dispatch) => {
  const data = await usersService.getAllUsers();

  dispatch({ type: "INIT_USERS", data });
};

export const usersReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;

    default:
      return state;
  }
};
