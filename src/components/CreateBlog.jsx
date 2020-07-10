import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

export function CreateBlog({ setBlogs, setBlogMsg }) {
  const [blog, setBlog] = useState(null);
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const handleChange = (event) => {
    event.persist();

    setBlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onBlogSubmit = async (event) => {
    event.preventDefault();
    setBlog(null);

    try {
      const res = await blogService.postBlog({ ...blog, user: user.id });

      if (res) {
        setBlogs((prevState) => prevState.concat(res));
      }
    } catch (error) {
      // setBlogMsg(error);
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="blog">
      <form onSubmit={onBlogSubmit}>
        <div>
          title
          <input onChange={handleChange} name="title" type="text" />
        </div>
        <div>
          author
          <input onChange={handleChange} name="author" type="text" />
        </div>
        <div>
          url
          <input onChange={handleChange} name="url" type="text" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
