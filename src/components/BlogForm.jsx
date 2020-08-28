import React from "react";
import { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  useColorMode,
  Stack,
  Flex,
} from "@chakra-ui/core";

export function BlogForm({ addBlog }) {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const { colorMode } = useColorMode();

  const handleChange = (event) => {
    event.persist();

    setBlog({
      ...blog,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Flex align="center" justify="center" className="blog">
      <form
        onSubmit={(event) => {
          addBlog(event, blog);
          setBlog({ title: "", author: "", url: "" });
        }}
      >
        <FormControl>
          <Stack spacing={4}>
            <Input
              id="title"
              value={blog.title}
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="Title"
              color={colorMode === "light" ? "white" : "black"}
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              borderColor="#81e6d9"
            />
            <Input
              id="author"
              value={blog.author}
              onChange={handleChange}
              name="author"
              type="text"
              placeholder="Author"
              color={colorMode === "light" ? "white" : "black"}
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              borderColor="#81e6d9"
            />
            <Input
              id="url"
              value={blog.url}
              onChange={handleChange}
              name="url"
              type="text"
              placeholder="URL"
              color={colorMode === "light" ? "white" : "black"}
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              borderColor="#81e6d9"
            />
          </Stack>

          <Button
            textAlign="center"
            m="10px auto"
            border="none"
            variantColor="teal"
            d="block"
            cursor="pointer"
            type="submit"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
}
