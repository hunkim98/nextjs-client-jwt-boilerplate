import React from "react";
import { useDispatch } from "react-redux";
import {
  validateAuthentication,
  validateRefreshToken,
} from "../../store/modules/auth";

interface Props {}
const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const onLoginSuccess = () => {
    dispatch(validateRefreshToken());
    dispatch(validateAuthentication());
  };
  return <div>Login</div>;
};

export default Login;
