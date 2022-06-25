import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { validateAuthentication } from "../../../store/modules/auth";
import { onLogin } from "../../../utils/login";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import * as S from "./styles";

interface Props {
  message: string;
}

const LoginModal: React.FC<Props> = ({ message }) => {
  const dispatch = useDispatch();
  const { onTokenReceived, onTokenFailure } = useContext(AuthContext);
  const onLoginSuccess = (accessToken: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    dispatch(validateAuthentication({ accessToken }));
  };
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
      .then(onTokenReceived)
      .catch((error) => {
        onTokenFailure(error);
        alert("로그인 정보가 잘못되었습니다");
      });
  };

  const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    Router.push({ pathname: "register" });
  };

  return (
    <S.Container>
      <S.ModalContainer>
        <div>Login</div>
        <div>{message}</div>
        <form onSubmit={onSubmit}>
          <label>
            이메일 주소 <input type="text" name="email"></input>
          </label>
          <label>
            비밀번호<input type="password" name="password"></input>
          </label>
          <div>
            <input type="submit" value="로그인하기" />
          </div>
        </form>
        <button onClick={onClickRegister}>회원가입하기</button>
        <a href="">비밀번호를 잊어버리셨나요?</a>
      </S.ModalContainer>
    </S.Container>
  );
};

export default LoginModal;
