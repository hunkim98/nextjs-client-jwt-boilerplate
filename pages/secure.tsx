import axios from "axios";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import React, { useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import wrapper from "../store/configureStore";
import { setUserInfo } from "../store/modules/userInfo";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import {
  AuthFromClientServerInterface,
  setAuthFromServerSide,
} from "../utils/setAuthFromServerSide";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const API_URL = process.env.API_URL!;
    const data = (
      await fetchWithAuth({
        url: API_URL.concat("/auth/check"),
        method: "GET",
        context,
      })
    ).data;
    return { props: { data } };
  });

const Secure: NextPage = ({
  ...data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log("hi", data);
  return (
    <AuthWrapper>
      <div>secure</div>
    </AuthWrapper>
  );
};

export default Secure;
