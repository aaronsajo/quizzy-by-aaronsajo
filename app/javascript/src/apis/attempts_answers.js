import axios from "axios";

const create = payload => axios.post("/attempt_answers", payload);

const attemptApi = {
  create,
};

export default attemptApi;
