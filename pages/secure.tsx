import { NextPage } from "next";
import React from "react";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";

const Secure: NextPage = () => {
  return (
    <AuthWrapper>
      <div>secure</div>
    </AuthWrapper>
  );
};

export default Secure;
