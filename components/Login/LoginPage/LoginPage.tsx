import axios from "axios";
import Router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import {
  validateAuthentication,
  validateRefreshToken,
} from "../../../store/modules/auth";

interface Props {
  redirectUrl: string | undefined;
}
const LoginPage: React.FC<Props> = ({ redirectUrl }) => {
  const dispatch = useDispatch();
  const onLoginSuccess = (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    dispatch(validateRefreshToken());
    dispatch(validateAuthentication());
    if (redirectUrl) {
      //if redirectUrl is defined, then go to that url
      //else stay in the current page
      Router.push(redirectUrl);
    }
  };
  return <div>Login</div>;
};

export default LoginPage;
