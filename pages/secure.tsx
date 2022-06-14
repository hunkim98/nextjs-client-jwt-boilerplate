import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import { RootState } from "../store/modules";

const Secure: NextPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      //fetch secure data if user is authenticated
    }
  }, [isAuthenticated]);
  return (
    <AuthWrapper>
      <div>secure</div>
    </AuthWrapper>
  );
};

export default Secure;
