import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import {
  initBlogs,
  putBlog,
  postCommentToBlog,
} from "../reducers/blogsReducer";
import { useState } from "react";
import { newNotification } from "../reducers/notificationsReducer";

export default function BlogView() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    comment: "",
  });

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

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs ? blogs.find((b) => b.id === id) : null;

  const handleChange = (e) => {
    setComment({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("loggedUser")) {
      try {
        dispatch(postCommentToBlog(blog.id, comment));
        setComment({ comment: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
      setComment({ comment: "" });
      dispatch(
        newNotification(
          "Even though comennts are anonymous, you have to be logged to leave a comment"
        )
      );
    }
  };

  useEffect(() => {
    if (!blogs) {
      dispatch(initBlogs());
    }
  }, [dispatch, blogs]);

  return (
    <div className="blog-view">
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <Link to={blog.url}>{blog.url}</Link>
          <div>
            <p> {blog.likes} Likes </p>
            <button onClick={updateBlog}>Like</button>
          </div>
          <p>Added by {blog.author}</p>
          <h4>Comments</h4>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={comment.comment}
              name="comment"
              type="text"
            />
            <button>Add comment</button>
          </form>
          {blog.comments && (
            <ul>
              {blog.comments.map((com, i) => (
                <li key={i}>{com}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
