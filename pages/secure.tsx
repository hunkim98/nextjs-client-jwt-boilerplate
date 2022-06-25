import axios from "axios";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import React, { useEffect } from "react";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import wrapper from "../store/configureStore";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    // const { isAuthenticated, accessToken } = store.getState().auth;

    // if (accessToken) {
    //   const API_URL = process.env.API_URL!;
    //   await axios.get(API_URL.concat(""), {});
    // }
    return { props: { data: "hi" } };
  });

const Secure: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AuthWrapper>
      <div>secure</div>
    </AuthWrapper>
  );
};

export default Secure;
