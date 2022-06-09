import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import { RootState } from "../store/modules";

const Secure: NextPage = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <AuthWrapper>
      <div>secure</div>
    </AuthWrapper>
  );
};

export default Secure;
