import React from "react";

export function Notification({ style, messsage }) {
  return (
    <div style={style} className="notification">
      <h2> {messsage}</h2>
    </div>
  );
}
