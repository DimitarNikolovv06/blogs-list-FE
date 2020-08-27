import axios from "axios";

const baseURL = "/api/users";

const getAllUsers = () => axios.get(baseURL).then((res) => res.data);

export default { getAllUsers };
