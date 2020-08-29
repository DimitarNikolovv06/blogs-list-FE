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
import { Switch, Route, Link as ReachLink, Redirect } from "react-router-dom";
import Users from "./components/Users";
import { User } from "./components/User";
import BlogView from "./components/BlogView";
import {
  Button,
  Box,
  Flex,
  useColorMode,
  Text,
  Link,
  Heading,
} from "@chakra-ui/core";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const { user, blogs, notifications } = useSelector((state) => state);
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverStyle = {
    color: "#81e6d9",
  };

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
    <Flex
      bg={colorMode === "light" ? "black" : "white"}
      minHeight="100vh"
      width="100%"
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      {notifications && <Notification />}

      {!user && <Login />}
      {user && (
        <Box className="landing-page">
          <Flex
            className="nav"
            borderBottom="2px solid #81e6d9"
            width="100vw"
            position="fixed"
            top={0}
            justify="space-around"
            height="10vh"
            align="center"
            left={0}
            padding="0 20px"
          >
            <Box>
              <Link
                textDecoration="none"
                as={ReachLink}
                color={colorMode === "light" ? "white" : "black"}
                to="/"
                fontSize="xl"
                fontWeight="bolder"
                _hover={hoverStyle}
                m="0 10px"
              >
                Home
              </Link>
              <Link
                textDecoration="none"
                _hover={hoverStyle}
                as={ReachLink}
                m="0 10px"
                color={colorMode === "light" ? "white" : "black"}
                to="/users"
                fontSize="xl"
                fontWeight="bolder"
              >
                Users
              </Link>
              <Link
                m="0 10px"
                textDecoration="none"
                _hover={hoverStyle}
                as={ReachLink}
                color={colorMode === "light" ? "white" : "black"}
                to="/blogs"
                fontSize="xl"
                fontWeight="bolder"
              >
                Blogs
              </Link>
            </Box>
            <Flex align="center">
              <Text
                fontSize="xl"
                fontWeight="bolder"
                color={colorMode === "light" ? "white" : "black"}
              >
                {user.username} is logged-in
              </Text>
              <Button
                border="none"
                cursor="pointer"
                variantColor="teal"
                onClick={handleLogout}
                ml={4}
              >
                Logout
              </Button>
              <Button
                cursor="pointer"
                border="1px solid #81e6d9"
                position="fixed"
                top={3}
                right={5}
                color={colorMode === "light" ? "#81e6d9" : "black"}
                bg={colorMode === "light" ? "black" : "white"}
                onClick={toggleColorMode}
              >
                Toggle
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
      <Switch>
        <Route exact path="/users/:id">
          {user ? <User /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/users/">
          {user ? <Users /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/blogs/:id">
          {user ? <BlogView /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/blogs">
          {user ? (
            <>
              {user && (
                <Togglable label="New Blog" ref={blogFormRef}>
                  <Text
                    fontSize="5x1"
                    fontWeight="bolder"
                    color={colorMode === "light" ? "#81e6d9" : "black"}
                    mb={5}
                  >
                    Create Blog
                  </Text>
                  <BlogForm addBlog={addBlog} />
                </Togglable>
              )}
              <Box>
                {blogs
                  .sort((a, b) => a.likes - b.likes)
                  .map((blog) => (
                    <Blog onRemove={onRemove} key={blog.id} blog={blog} />
                  ))}
              </Box>
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          {user && (
            <Heading
              color={colorMode === "light" ? "#81e6d9" : "black"}
              as="h1"
              size="2xl"
            >
              Welcome back, <br />
              {user.username}
            </Heading>
          )}
        </Route>
      </Switch>
    </Flex>
  );
};

export default App;
