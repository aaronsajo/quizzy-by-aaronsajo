import axios from "axios";

const login = payload => axios.post("/users", payload);
const report_export = () => axios.get("/export");
const export_status = id => axios.get(`/export_status/${id}`);
const export_download = id => axios.get(`/export_download/${id}`);
const usersApi = {
  login,
  report_export,
  export_download,
  export_status,
};

export default usersApi;
