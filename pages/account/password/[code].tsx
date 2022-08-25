import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { PostPasswordDto } from "../../../dto/Password/password.dto";
import Router from "next/router";
import {
  GetPasswordTokenResDto,
  PostPasswordResDto,
} from "../../../dto/Password/password.res.dto";
import ChangePassword from "../../../components/Account/Password/ChangePassword";
import { useCallback } from "react";
import { NotAuthenticatedPassword } from "../../../components/Account/Password/NotAuthenticatedPassword/NotAuthenticatedPassword";
import useAlert from "../../../components/AlertContext/useAlert";
import Head from "next/head";

type PageProps = {
  accessToken: string;
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const API_URL = process.env.API_URL!;
    const code = params!.code;
    const { accessToken } = (
      await axios({
        url: API_URL.concat(`/auth/password/token/${code}`),
        method: "GET",
      })
    ).data as GetPasswordTokenResDto;
    return { props: { accessToken } };
  } catch (error) {
    return { props: { accessToken: "" } };
  }
};

const VerifyPasswordChangePage: NextPage<PageProps> = ({ accessToken }) => {
  const alert = useAlert();
  const updatePassword = useCallback(
    (password: string) => {
      const data: PostPasswordDto = { password };
      return axios
        .post("/api/auth/password", data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          const data = res.data as PostPasswordResDto;
          alert.open({ message: "비밀번호가 성공적으로 변경되었습니다." });
          Router.push("/login");
        })
        .catch((err) => {
          alert.open({
            message:
              "비밀번호 변경 시간이 만료되었습니다. 비밀번호 찾기에서 다시 인증 이메일을 받으세요",
          });
          Router.push("/account/find");
        });
    },
    [accessToken]
  );
  if (!accessToken) {
    return <NotAuthenticatedPassword />;
  }
  return (
    <>
      <Head>
        <title>비밀번호 변경</title>
        <meta name="description" content="비밀번호 변경" />
      </Head>
      <ChangePassword updatePassword={updatePassword} />
    </>
  );
};

export default VerifyPasswordChangePage;
