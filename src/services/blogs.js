import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, blog, config);

  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);

  return res.data;
};

const putBlog = async (blog) => {
  await axios.put(`${baseUrl}/${blog.id}`, blog);
};

export default { getAll, setToken, postBlog, deleteBlog, putBlog };
