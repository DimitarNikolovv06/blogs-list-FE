import React from "react";
import { Link as ReachLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, useColorMode, Link, Flex } from "@chakra-ui/core";

export default function Blog({ onRemove, blog }) {
  const user = useSelector((state) => state.user) || {};
  const { colorMode } = useColorMode();
  const hoverStyle = {
    color: colorMode === "light" ? "white" : "#81e6d9",
  };

  return (
    <Box position="relative" className="blog">
      <Flex align="flex-start" justify="flex-start">
        {
          <Link
            textDecoration="none"
            color={colorMode === "light" ? "#81e6d9" : "black"}
            fontSize="4xl"
            fontWeight="bolder"
            _hover={hoverStyle}
            as={ReachLink}
            to={`/blogs/${blog.id}`}
            mr={5}
            mb={5}
          >
            {blog.title}
          </Link>
        }{" "}
        {user.id === (blog.user.id ? blog.user.id : blog.user) && (
          <Button
            mt={2}
            border="none"
            variantColor="red"
            id="#remove-btn"
            onClick={(event) => onRemove(event, blog.id)}
            h={8}
            d="block"
            ml="auto"
            cursor="pointer"
          >
            Remove
          </Button>
        )}
      </Flex>
    </Box>
  );
}
