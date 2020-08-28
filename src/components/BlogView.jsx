import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link as ReachLink } from "react-router-dom";
import { useEffect } from "react";
import {
  initBlogs,
  putBlog,
  postCommentToBlog,
} from "../reducers/blogsReducer";
import { useState } from "react";
import { newNotification } from "../reducers/notificationsReducer";
import {
  Button,
  Text,
  Box,
  List,
  ListItem,
  useColorMode,
  Heading,
  Flex,
  Link,
  Textarea,
} from "@chakra-ui/core";

export default function BlogView() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    comment: "",
  });
  const { colorMode } = useColorMode();
  const hoverStyle = {
    color: "#81e6d9",
  };

  const updateBlog = (event) => {
    event.preventDefault();

    dispatch(
      putBlog({
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      })
    );
  };

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs ? blogs.find((b) => b.id === id) : null;

  const handleChange = (e) => {
    setComment({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("loggedUser")) {
      try {
        dispatch(postCommentToBlog(blog.id, comment));
        setComment({ comment: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
      setComment({ comment: "" });
      dispatch(
        newNotification(
          "Even though comennts are anonymous, you have to be logged to leave a comment"
        )
      );
    }
  };

  useEffect(() => {
    if (!blogs) {
      dispatch(initBlogs());
    }
  }, [dispatch, blogs]);

  return (
    <Flex
      maxW="60vw"
      direction="column"
      color={colorMode === "light" ? "white" : "black"}
      className="blog-view"
      position="relative"
      mt="10vh"
    >
      {blog && (
        <Box>
          <Heading color="#81e6d9" as="h1" size="5xl">
            {blog.title}
          </Heading>

          <Flex m="20px 0 50px 0" justify="space-between" align="center">
            <Link
              fontSize="xl"
              fontWeight="bolder"
              _hover={hoverStyle}
              as={ReachLink}
              to={blog.url}
              color={colorMode === "light" ? "white" : "black"}
              mr="auto"
            >
              {blog.url}
            </Link>
          </Flex>
          <Text fontStyle="italic" position="absolute" bottom={0} right={0}>
            Author-- {blog.author}
          </Text>
          <Text mb={5} fontSize="xl">
            Comments
          </Text>

          <form onSubmit={handleSubmit}>
            <Textarea
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              color={colorMode === "light" ? "white" : "black"}
              placeholder="Share your thoughts..."
              onChange={handleChange}
              value={comment.comment}
              name="comment"
              type="text"
              mb={5}
            />
            <Flex>
              <Button
                type="submit"
                variantColor="teal"
                border="none"
                cursor="pointer"
                m="auto 3px"
              >
                Add comment
              </Button>
              <Button
                cursor="pointer"
                onClick={updateBlog}
                border="none"
                m="auto 3px"
              >
                Like
              </Button>
              <Text ml="auto " fontSize="3xl">
                {" "}
                {blog.likes} Likes{" "}
              </Text>
            </Flex>
          </form>

          {blog.comments && (
            <List m="30px auto">
              {blog.comments.map((com, i) => (
                <ListItem
                  pb={3}
                  pl={5}
                  fontWeight="bold"
                  fontStyle="italic"
                  key={i}
                >
                  <q>{com}</q>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </Flex>
  );
}
