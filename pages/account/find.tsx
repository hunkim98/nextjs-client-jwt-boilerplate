import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import FindAccount from "../../components/Account/Find/FindAccount";
import { ForgotPasswordBodyDto } from "../../dto/Password/forgot.password.dto";

type PageProps = {};

const Find: NextPage<PageProps> = () => {
  return (
    <>
      <Head>
        <title>아이디/비밀번호 찾기</title>
        <meta name="description" content="아이디/비밀번호 찾기" />
      </Head>
      <FindAccount />
    </>
  );
};

export default Find;
