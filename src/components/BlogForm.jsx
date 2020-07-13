import React from "react";
import { useState } from "react";

export function BlogForm({ addBlog }) {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    event.persist();

    setBlog({
      ...blog,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="blog">
      <form onSubmit={(event) => addBlog(event, blog)}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            value={blog.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            value={blog.author}
            onChange={handleChange}
            name="author"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            id="url"
            value={blog.url}
            onChange={handleChange}
            name="url"
            type="text"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
