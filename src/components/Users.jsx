import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../reducers/usersReducer";
import { Link as ReachLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  useColorMode,
  Link,
  Heading,
  Flex,
} from "@chakra-ui/core";

export default function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { colorMode } = useColorMode();
  const hoverStyle = {
    color: "#81e6d9",
  };

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  return (
    users && (
      <Box height="90vh" mt="10vh" w="100%">
        <Flex className="users" w="100%" align="flex-end" pl={5} mt={15}>
          <Heading
            color={colorMode === "light" ? "white" : "black"}
            as="h1"
            size="2xl"
          >
            Users:
          </Heading>
          <List pb={1}>
            {users.map((u, i) => (
              <ListItem ml={3} d="block" key={i}>
                <Link
                  textDecoration="none"
                  color={colorMode === "light" ? "white" : "black"}
                  fontSize="3xl"
                  fontWeight="bolder"
                  as={ReachLink}
                  to={`/users/${u.id}`}
                  _hover={hoverStyle}
                >
                  {u.username}
                </Link>{" "}
                {u.blogs.length}
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
    )
  );
}
