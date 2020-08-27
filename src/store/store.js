import { createStore, combineReducers, applyMiddleware } from "redux";
import { notificationsReducer } from "../reducers/notificationsReducer";
import { blogsReducer } from "../reducers/blogsReducer";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { usersReducer } from "../reducers/usersReducer";

const reducer = combineReducers({
  notifications: notificationsReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
