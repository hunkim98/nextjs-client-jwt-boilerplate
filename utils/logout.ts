import axios from "axios";

export const onLogOut = () => {
  return axios.post("/api/auth/logout", {});
};
