import React from "react";
import { useState } from "react";

export function CreateBlog({ addBlog }) {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    event.persist();

    setBlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="blog">
      <form onSubmit={(event) => addBlog(event, blog)}>
        <div>
          title
          <input
            value={blog.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
        </div>
        <div>
          author
          <input
            value={blog.author}
            onChange={handleChange}
            name="author"
            type="text"
          />
        </div>
        <div>
          url
          <input
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
