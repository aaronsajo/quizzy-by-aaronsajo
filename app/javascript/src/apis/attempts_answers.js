import axios from "axios";

const create = payload => axios.post("/attempt_answers", payload);

const attemptAnswerApi = {
  create,
};

export default attemptAnswerApi;
