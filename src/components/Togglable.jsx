import React from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@chakra-ui/core";

export const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggle, visible }));

  return (
    <>
      <Box style={hideWhenVisible}>
        <Button
          cursor="pointer"
          border="none"
          variantColor="teal"
          onClick={toggle}
        >
          {props.label}
        </Button>
      </Box>
      <Box style={showWhenVisible}>
        {props.children}
        <Button
          d="block"
          border="none"
          variantColor="red"
          onClick={toggle}
          m="auto"
          cursor="pointer"
        >
          Close
        </Button>
      </Box>
    </>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
