import axios from "axios";

const login = payload => axios.post("/users", payload);

const usersApi = {
  login,
};

export default usersApi;
