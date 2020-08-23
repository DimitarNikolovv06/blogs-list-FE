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

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const localuser = JSON.parse(localStorage.getItem("loggedUser")) || null;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (localuser) blogService.setToken(localuser.token);
  }, [localuser]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  const addBlog = async (event, blog) => {
    event.preventDefault();
    blogFormRef.current.toggle();

    try {
      await dispatch(postBlog({ ...blog, user: localuser.id }));
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
    <div>
      <Notification />
      {!localuser && <Login />}
      <h2>Blogs</h2>
      {localuser && (
        <div>
          <p>{localuser.username} is logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable label="Add New" ref={blogFormRef}>
            <h2>Create blog</h2>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog onRemove={onRemove} key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default App;
