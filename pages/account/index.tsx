import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Account from "../../components/Account/Account";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import { PutUserProfileDto } from "../../dto/User/user.dto";
import { GetUserAccountResDto } from "../../dto/User/user.res.dto";
import { RootState } from "../../store/modules";

type PageProps = {};

const AccountPage: NextPage<PageProps> = () => {
  const [accountInfo, setAccountInfo] = useState<GetUserAccountResDto>({
    name: "",
    nickname: "",
    email: "",
    telephone: "",
    isSnsAgreed: false,
  });
  const [changeableAccountInfo, setChangeableAccountInfo] =
    useState<PutUserProfileDto>({ isSnsAgreed: false, telephone: "" });
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  useEffect(() => {
    if (accessToken) {
      getAccountInfo();
    }
  }, [accessToken]);
  const getAccountInfo = useCallback(() => {
    return axios.get("/api/users/account").then((res) => {
      const data = res.data as GetUserAccountResDto;
      setAccountInfo(data);
      setChangeableAccountInfo({
        isSnsAgreed: data.isSnsAgreed,
        telephone: data.telephone,
      });
    });
  }, [accessToken]);
  return (
    <AuthWrapper>
      <Head>
        <title>Account</title>
        <meta name="description" content="Account" />
      </Head>
      <Account
        accountInfo={accountInfo}
        getAccountInfo={getAccountInfo}
        changeableAccountInfo={changeableAccountInfo}
        setChangeableAccountInfo={setChangeableAccountInfo}
      ></Account>
    </AuthWrapper>
  );
};

export default AccountPage;
