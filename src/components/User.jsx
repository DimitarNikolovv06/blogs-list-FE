import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { initUsers } from "../reducers/usersReducer";
import {
  Box,
  Text,
  useColorMode,
  List,
  ListItem,
  Link,
  Heading,
} from "@chakra-ui/core";
import { Link as ReachLink } from "react-router-dom";

export function User() {
  const dispatch = useDispatch();
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users ? users.find((u) => u.id === id) : null;
  const { colorMode } = useColorMode();
  const hoverStyle = {
    color: colorMode === "light" ? "white" : "#81e6d9",
  };

  useEffect(() => {
    if (!users) {
      dispatch(initUsers());
    }
  }, [dispatch, users]);

  return (
    <Box color={colorMode === "light" ? "white" : "black"} className="user">
      {user && (
        <Heading as="h2" size="xl">
          {user.username}
        </Heading>
      )}
      <Text mb={6} fontSize="xl">
        Added Blogs:
      </Text>
      <List>
        {user
          ? user.blogs.map((b, i) => (
              <ListItem key={i}>
                <Link
                  textDecoration="none"
                  color={colorMode === "light" ? "#81e6d9" : "black"}
                  fontSize="xl"
                  fontWeight="bolder"
                  _hover={hoverStyle}
                  as={ReachLink}
                  to={`/blogs/${b.id}`}
                >
                  {b.title}
                </Link>
              </ListItem>
            ))
          : `loading...`}
      </List>
    </Box>
  );
}
