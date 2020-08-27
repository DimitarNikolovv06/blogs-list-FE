import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationsReducer";
import { storeUser } from "../reducers/userReducer";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(storeUser({ username, password }));
    } catch (error) {
      dispatch(newNotification(error.response.data.error));

      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            id="username"
            onChange={({ target }) => setUsername(target.value)}
            name="Username"
            type="text"
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password"
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
            type="password"
          />
        </div>
        <button id="login-btn">LOGIN</button>
      </form>
    </div>
  );
}
