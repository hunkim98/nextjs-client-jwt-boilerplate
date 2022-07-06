import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { ForgotPasswordBodyDto } from "../../dto/Password/forgot.password.dto";

type PageProps = {};

const Find: NextPage<PageProps> = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserEmail(event.target.value);
  };

  const validateEmail = (email: string) => {
    return !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const forgotPasswordAxios = async ({ email }: ForgotPasswordBodyDto) => {
    return axios.post("/api/auth/password/forgot", { email: email });
  };

  const onClickResetPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    forgotPasswordAxios({ email: userEmail })
      .then((res) => {
        const hasUserConfirmed = confirm(
          "임시 비밀번호가 이메일로 전송되었습니다"
        );
        if (hasUserConfirmed) {
          Router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <div>비밀번호 찾기</div>
        <div>
          이메일을 입력하세요. 이메일로 임의의 새로운 비밀번호를 보냅니다
        </div>
        <input
          type="email"
          value={userEmail}
          onChange={handleEmailInputChange}
        />
        <button
          disabled={validateEmail(userEmail) ? true : false}
          onClick={onClickResetPassword}
        >
          비밀번호 초기화하기
        </button>
      </div>
    </div>
  );
};

export default Find;
