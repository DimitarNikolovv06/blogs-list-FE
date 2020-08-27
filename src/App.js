import React, { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { Login } from "./components/Login";
import { Notification } from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import { Togglable } from "./components/Togglable";
import { newNotification } from "./reducers/notificationsReducer";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs, postBlog, deleteBlog } from "./reducers/blogsReducer";
import blogService from "./services/blogs";
import { Switch, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import { User } from "./components/User";
import BlogView from "./components/BlogView";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const { user, blogs } = useSelector((state) => state);

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const addBlog = async (event, blog) => {
    event.preventDefault();
    blogFormRef.current.toggle();

    try {
      await dispatch(postBlog({ ...blog, user: user.id }));
    } catch (error) {
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
      dispatch(newNotification(error.response.data.error));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.clear();
    dispatch({ type: "CLEAR_USER" });
  };

  const onRemove = (event, id) => {
    event.preventDefault();

    const result = window.confirm("Are you sure you want to remove this blog?");

    if (result) {
      try {
        dispatch(deleteBlog(id));
      } catch (error) {
        dispatch(newNotification(error.response.data.error));
      }
    }
  };

  return (
    <>
      <div>
        <Notification />
        {!user && <Login />}
        {user && (
          <div className="landing-page">
            <nav style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <Link to="/users">Users</Link>
              <Link to="/blogs">Blogs</Link>
              <p>{user.username} is logged-in</p>
              <button
                style={{ display: "block", height: " 50%" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>

            <Togglable label="Add New" ref={blogFormRef}>
              <h2>Create blog</h2>
              <BlogForm addBlog={addBlog} />
            </Togglable>
            <h3>Blogs</h3>
          </div>
        )}
      </div>
      <Switch>
        <Route exact path="/users/:id">
          <User />
        </Route>
        <Route exact path="/users/">
          <Users />
        </Route>
        <Route exact path="/blogs/:id">
          <BlogView />
        </Route>
        <Route>
          <div>
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .map((blog) => (
                <Blog onRemove={onRemove} key={blog.id} blog={blog} />
              ))}
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
