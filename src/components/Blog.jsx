import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Blog({ onRemove, blog }) {
  const user = useSelector((state) => state.user) || {};

  const style = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    margin: 5,
  };

  return (
    <div className="blog" style={style}>
      {<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}{" "}
      {user.id === (blog.user.id ? blog.user.id : blog.user) && (
        <button
          id="#remove-btn"
          style={{
            background: "blue",
            marginLeft: 15,
            padding: 5,
            color: "white",
            border: "solid",
            cursor: "pointer",
          }}
          onClick={(event) => onRemove(event, blog.id)}
        >
          Remove
        </button>
      )}
    </div>
  );
}
