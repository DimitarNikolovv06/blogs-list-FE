import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationsReducer";
import { storeUser } from "../reducers/userReducer";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  Input,
  useColorMode,
} from "@chakra-ui/core";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(storeUser({ username, password }));
    } catch (error) {
      dispatch(newNotification(error.response.data.error));

      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
    }
  };

  return (
    <Flex
      justify="center"
      w={400}
      h={400}
      border="1px solid #81e6d9"
      className="login"
      align="center"
    >
      <form onSubmit={handleLogin}>
        <FormControl>
          <Stack spacing={3}>
            <Input
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
              type="text"
              placeholder="Username"
              color={colorMode === "light" ? "white" : "black"}
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              borderColor="#81e6d9"
            />
            <Input
              color={colorMode === "light" ? "white" : "black"}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
              type="password"
              placeholder="Password"
              focusBorderColor="#81e6d9"
              bg={colorMode === "light" ? "black" : "white"}
              borderColor="#81e6d9"
            />
          </Stack>
          <Button
            variantColor="teal"
            textAlign="center"
            border="none"
            type="submit"
            id="login-btn"
            m="20px auto"
            d="block"
            cursor="pointer"
          >
            LOGIN
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
}
