import axios from "axios";

const create = payload => axios.post("/questions", payload);
const show = id => axios.get(`/questions/${id}`);
const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);
const destroy = id => axios.delete(`/questions/${id}`);
const list = id => axios.get("/questions", { params: { id } });
export const questionApi = {
  create,
  show,
  update,
  destroy,
  list,
};
