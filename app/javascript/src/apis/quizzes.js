import axios from "axios";

const list = () => axios.get("/quizzes");
const create = payload => axios.post(`/quizzes`, payload);
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const show = id => axios.get(`/quizzes/${id}`);
const destroy = id => axios.delete(`/quizzes/${id}`);
const createSlug = id => axios.get(`quizzes/slug/${id}`);
const quizzesApi = {
  list,
  create,
  update,
  show,
  destroy,
  createSlug,
};

export default quizzesApi;
