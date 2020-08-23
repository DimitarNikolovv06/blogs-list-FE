import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putBlog } from "../reducers/blogsReducer";

export default function Blog({ onRemove, blog }) {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const user = useSelector((state) => state.user) || {};
  const localUser = JSON.parse(localStorage.getItem("loggedUser")) || {};

  const style = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    margin: 5,
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const updateBlog = (event) => {
    event.preventDefault();

    dispatch(
      putBlog({
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1,
      })
    );
  };

  return (
    <div className="blog" style={style}>
      {blog.title} {!showInfo ? blog.author : ""}
      <button
        id="expand-btn"
        onClick={toggleInfo}
        style={{
          background: "white",
          marginLeft: 15,
          padding: 5,
          color: "black",
          border: "solid",
          cursor: "pointer",
        }}
      >
        Expand
      </button>
      {localUser.id === (blog.user.id ? blog.user.id : blog.user) && (
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
      {showInfo && (
        <div>
          <div> {blog.url} </div>
          <div className="likes">
            {blog.likes}{" "}
            <button id="like-btn" onClick={updateBlog}>
              Like
            </button>{" "}
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
}
