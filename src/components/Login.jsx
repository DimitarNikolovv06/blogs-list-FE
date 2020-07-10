import React from "react";

export function Login({ setPassword, setUsername, handleLogin }) {
  return (
    <div className="login">
      <form onSubmit={(event) => handleLogin(event)}>
        <div>
          <label>username</label>
          <input
            onChange={({ target }) => setUsername(target.value)}
            name="Username"
            type="text"
          />
        </div>
        <div>
          <label>password</label>
          <input
            onChange={({ target }) => setPassword(target.value)}
            name="Password"
            type="password"
          />
        </div>
        <button>LOGIN</button>
      </form>
    </div>
  );
}
