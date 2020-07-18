import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

export default function Blog({ onRemove, blog }) {
  const [blogState, setBlog] = useState(blog);
  const [showInfo, setShowInfo] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedUser")) || {};

  const blogStyle = {
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
    setBlog({ ...blogState, likes: blogState.likes + 1 });

    blogService
      .putBlog({
        ...blogState,
        user: blogState.user.id,
        likes: blogState.likes + 1,
      })
      .then(() => console.log("up"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="blog" style={blogStyle}>
      {blogState.title} {!showInfo ? blogState.author : ""}
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
      {user.id === (blogState.user.id ? blogState.user.id : blogState.user) && (
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
          <div> {blogState.url} </div>
          <div className="likes">
            {blogState.likes}{" "}
            <button id="like-btn" onClick={updateBlog}>
              Like
            </button>{" "}
          </div>
          <div>{blogState.author}</div>
        </div>
      )}
    </div>
  );
}
