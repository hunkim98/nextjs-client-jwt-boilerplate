import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { VerifiedUserResDto } from "../../../dto/common/verified.user.res.dto";
import { validateAuthentication } from "../../../store/modules/auth";
import { onLogin } from "../../../utils/login";
import useAlert from "../../AlertContext/useAlert";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Portal from "../../Portal/Portal";
import * as S from "./styles";

interface Props {
  message: string;
}

const LoginModal: React.FC<Props> = ({ message }) => {
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
        }
        return response;
      })
      .then(onTokenReceived)
      .catch((error) => {
        onTokenFailure(error);
        alert.open({ message: "login information is wrong" });
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
      <S.Container>
        <S.ModalContainer>
          <div>Login</div>
          <div>{message}</div>
          <form onSubmit={onSubmit}>
            <label>
              email <input type="text" name="email"></input>
            </label>
            <label>
              password <input type="password" name="password"></input>
            </label>
            <div>
              <input type="submit" value="login" />
            </div>
          </form>
          <button onClick={onClickRegister}>register</button>
          <button onClick={onClickFindAccount}>
            Did you forget your password?
          </button>
        </S.ModalContainer>
      </S.Container>
    </>
  );
};

export default LoginModal;
