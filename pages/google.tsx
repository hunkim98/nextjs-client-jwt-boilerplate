import React from "react";
import axios from "axios";
import Router from "next/router";
import {
  CodeResponse,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
  GoogleLogin,
} from "@react-oauth/google";

function google() {
  const onClickTest = () => {
    axios.get("/api").then((res) => console.log(res));
  };

  const onGoogleLoginSuccess = async (tokenResponse: CodeResponse) => {
    const code: string = tokenResponse.code;
    const { user, email } = (
      await axios.post("/api/auth/google/authenticate", { token: code })
    ).data;
    if (user) {
      // Router.push('')
    } else {
      Router.push({ pathname: "signup", query: { socialEmail: email } });
    }
  };
  const onGoogleLoginError = (error: any) => {
    console.log(error);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onError: onGoogleLoginError,
    flow: "auth-code",
  });

  return (
    <div>
      <button onClick={() => googleLogin()}>Google Login</button>
      <div onClick={onClickTest}>test</div>
    </div>
  );
}

export default google;
