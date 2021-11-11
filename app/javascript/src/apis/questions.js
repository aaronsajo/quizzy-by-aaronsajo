import axios from "axios";

const create = payload => axios.post("/questions", payload);

export const questionApi = {
  create,
};
