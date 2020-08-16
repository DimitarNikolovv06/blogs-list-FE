import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useSource = (baseURL) => {
  let token = null;
  const [blogs, setBlogs] = useState([]);

  const getAll = useCallback(() => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
  }, [baseURL]);

  useEffect(() => {
    getAll().then((res) => setBlogs(res));
  }, [getAll]);

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };
  const postBlog = async (blog) => {
    const config = {
      headers: { Authorization: token },
    };

    const res = await axios.post(baseURL, blog, config);

    return res.data;
  };

  const deleteBlog = async (id) => {
    const config = {
      headers: { Authorization: token },
    };

    const res = await axios.delete(`${baseURL}/${id}`, config);

    return res.data;
  };

  const putBlog = async (blog) => {
    await axios.put(`${baseURL}/${blog.id}`, blog);
  };

  return [
    blogs,
    {
      getAll,
      postBlog,
      deleteBlog,
      putBlog,
      setToken,
      setBlogs,
    },
  ];
};
