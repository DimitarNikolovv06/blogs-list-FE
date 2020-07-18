import React from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
      <div style={hideWhenVisible}>
        <button onClick={toggle}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>Close</button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
