import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ChangePassword from "../../../components/Account/Password/ChangePassword";
import useAlert from "../../../components/AlertContext/useAlert";
import AuthWrapper from "../../../components/AuthWrapper/AuthWrapper";
import { PostPasswordDto } from "../../../dto/Password/password.dto";
import { PostPasswordResDto } from "../../../dto/Password/password.res.dto";
import { RootState } from "../../../store/modules";

type PageProps = {};

const PasswordChangePage: NextPage<PageProps> = () => {
  const alert = useAlert();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const updatePassword = useCallback(
    (password: string) => {
      const data: PostPasswordDto = { password };
      return axios
        .post("/api/auth/password", data)
        .then((res) => {
          const data = res.data as PostPasswordResDto;
          alert.open({ message: "비밀번호가 성공적으로 변경되었습니다" });
          Router.push("/");
        })
        .catch((err) => {
          alert.open({
            message: "비밀번호 변경에 오류가 생겼습니다. 다시 진행해주세요",
          });
          console.log(err);
        });
    },
    [accessToken]
  );
  return (
    <AuthWrapper>
      <Head>
        <title>비밀번호 변경</title>
        <meta name="description" content="비밀번호 변경" />
      </Head>
      <ChangePassword updatePassword={updatePassword} />
    </AuthWrapper>
  );
};

export default PasswordChangePage;
