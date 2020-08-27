import axios from "axios";
const baseUrl = "/api/login";

const login = async (user) => {
  const res = await axios.post(baseUrl, user);

  return res.data;
};

const getLoggedUser = () =>
  JSON.parse(localStorage.getItem("loggedUser")) || null;

export default { login, getLoggedUser };
