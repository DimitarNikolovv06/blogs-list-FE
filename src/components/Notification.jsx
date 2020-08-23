import React from "react";
import { useSelector } from "react-redux";

export function Notification() {
  const message = useSelector((state) => state.notifications);

  const style = {
    color: message ? "rgb(255,0,0)" : undefined,
    margin: 5,
  };

  return (
    <div style={style} className="notification">
      <h2> {message}</h2>
    </div>
  );
}
