import React from "react";

export function Notification({ style, messsage }) {
  return (
    <div className="notification">
      <h2 style={style}> {messsage}</h2>
    </div>
  );
}
