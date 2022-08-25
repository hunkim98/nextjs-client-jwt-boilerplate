import axios from "axios";
import Router from "next/router";

import React, { useContext, useState } from "react";
import { VerifiedUserResDto } from "../../../dto/common/verified.user.res.dto";
import { onLogin } from "../../../utils/login";
import useAlert from "../../AlertContext/useAlert";
import { AuthContext } from "../../AuthProvider/AuthProvider";

interface Props {
  redirectUrl: string | undefined;
}
const LoginPage: React.FC<Props> = () => {
  const alert = useAlert();
  const { onTokenReceived, onTokenFailure } = useContext(AuthContext);
  const onSubmit = async (event: React.SyntheticEvent) => {
    //we must do prevent default to prevent the website from refreshing
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    await onLogin({ email, password })
      .then((response) => {
        const { isEmailVerified, accessToken } =
          response.data as VerifiedUserResDto;
        if (!isEmailVerified) {
          alert.open({
            message: "Please verify your email",
            buttons: [
              {
                label: "send email",
                onClick: () => {
                  axios
                    .get("/api/auth/register/token", {
                      headers: { Authorization: `Bearer ${accessToken}` },
                    })
                    .then((res) => {
                      alert.open({
                        message: "verification email has been sent!",
                      });
                    })
                    .catch((err) => {
                      alert.open({ message: "An error has occurred" });
                    });
                },
              },
            ],
          });
        } else {
          onTokenReceived(response);
          Router.push("/");
        }
        return response;
      })
      .catch((error) => {
        onTokenFailure(error);
        alert.open({ message: "로그인 정보가 잘못되었습니다" });
      });
  };

  const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Router.push("/register");
  };

  const onClickFindAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Router.push("/account/find");
  };
  return (
    <>
      <div>Login</div>
      <form onSubmit={onSubmit}>
        <label>
          email <input type="text" name="email"></input>
        </label>
        <label>
          password <input type="password" name="password"></input>
        </label>
        <div>
          <input type="submit" value="로그인하기" />
        </div>
      </form>
      <button onClick={onClickRegister}>회원가입하기</button>
      <button onClick={onClickFindAccount}>비밀번호를 잊어버리셨나요?</button>
    </>
  );
};

export default LoginPage;
