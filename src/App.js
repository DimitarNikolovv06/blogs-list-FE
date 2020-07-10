import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Login } from "./components/Login";
import { Notification } from "./components/Notification";
import { CreateBlog } from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [blogMsg, setBlogMsg] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (localUser) {
      setUser(localUser);
      blogService.setToken(localUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      setErrMessage(error);

      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification messsage={errMessage} />

      {!user && (
        <div>
          <h1>LOGIN</h1>
          <Login
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
          />
        </div>
      )}
      <h2>blogs</h2>
      {user && (
        <div>
          <p>{user.username} is logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          {blogMsg && <div>{blogMsg}</div>}
          <h2>Create blog</h2>
          <CreateBlog setBlogMsg={setBlogMsg} setBlogs={setBlogs} />
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
