import axios from "axios";

const show = id => axios.get(`/attempts/${id}`);
const attemptApi = {
  show,
};

export default attemptApi;
