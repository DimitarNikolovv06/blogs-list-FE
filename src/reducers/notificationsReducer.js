export const newNotification = (str) => ({
  type: "NEW_NOTIFICATION",
  data: str,
});

export const notificationsReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;

    default:
      return state;
  }
};
