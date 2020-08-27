export const newNotification = (data) => ({
  type: "NEW_NOTIFICATION",
  data,
});

export const notificationsReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;

    default:
      return state;
  }
};
