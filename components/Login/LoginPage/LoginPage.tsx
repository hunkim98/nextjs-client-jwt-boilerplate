import axios from "axios";
import Router from "next/router";

import React, { useContext, useState } from "react";
import { VerifiedUserResDto } from "../../../dto/common/verified.user.res.dto";
import { onLogin } from "../../../utils/login";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Portal from "../../Portal/Portal";
import VerifyEmailModal from "../../VerifyEmail/VerifyEmailModal";

interface Props {
  redirectUrl: string | undefined;
}
const LoginPage: React.FC<Props> = () => {
  const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] =
    useState<boolean>(false);
  const [tempAccessTokenForEmailVerify, setTempAccessTokenForEmailVerify] =
    useState<null | string>(null);
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
          setIsEmailVerifyModalOpen(true);
          setTempAccessTokenForEmailVerify(accessToken);
        }
        return response;
      })
      .then(onTokenReceived)
      .then(() => Router.push("/"))
      .catch((error) => {
        onTokenFailure(error);
        alert("로그인 정보가 잘못되었습니다");
      });
  };

  const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    Router.push({ pathname: "register" });
  };
  return (
    <>
      {isEmailVerifyModalOpen && (
        <Portal>
          <VerifyEmailModal
            tempAccessTokenForEmailVerify={tempAccessTokenForEmailVerify}
            setIsEmailVerifyModalOpen={setIsEmailVerifyModalOpen}
          />
        </Portal>
      )}
      <div>Login</div>
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
    </>
  );
};

export default LoginPage;
