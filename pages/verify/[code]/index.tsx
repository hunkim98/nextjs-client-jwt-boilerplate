import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    "The code is not correct or the verification has expired. Please proceed to login and get the verify email again";
  const successMessage = "Verified!!";
  return (
    <div>
      <div>{success ? successMessage : errorMessage}</div>
      {success ? (
        <Link href={"/"}>
          <button>Go to home</button>
        </Link>
      ) : (
        <Link href={"/login"}>
          <button>Go to login page</button>
        </Link>
      )}
    </div>
  );
};

export default Verify;
