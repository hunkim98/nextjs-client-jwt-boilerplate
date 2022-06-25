import { NextPage } from "next";
import LoginPage from "../components/Login/LoginPage/LoginPage";

const Login: NextPage = () => {
  return <LoginPage redirectUrl="/" />;
};

export default Login;
