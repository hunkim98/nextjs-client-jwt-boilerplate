import axios from "axios";
import { LoginBodyDto } from "../dto/Login/login.dto";

export const onLogin = ({ email, password }: LoginBodyDto) => {
  return axios.post("/api/auth/login", {
    email: email,
    password: password,
  });
};
