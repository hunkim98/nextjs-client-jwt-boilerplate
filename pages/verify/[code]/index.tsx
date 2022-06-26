import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { VerifyTokenResDto } from "../../../dto/Register/verify.token.res.dto";

type PageProps = {
  success: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const API_URL = process.env.API_URL!;
    const { code } = context.query;
    const success = (
      await axios({
        url: API_URL.concat("/auth/register/verify"),
        method: "POST",
        data: { code: code },
      })
    ).data as VerifyTokenResDto;
    return { props: { success: success } };
  } catch (error) {
    return { props: { success: false } };
  }
};

const Verify: NextPage<PageProps> = ({ success }) => {
  const errorMessage =
    "인증 코드가 올바르지 않거나 만료되었습니다. 로그인해서 인증 코드를 다시 받으세요.";
  const successMessage = "인증되었습니다!";
  return (
    <div>
      <div>{success ? successMessage : errorMessage}</div>
      <Link href={"/login"}>
        <button>로그인 페이지로 가기</button>
      </Link>
    </div>
  );
};

export default Verify;
