import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedUserResDto } from "../../dto/common/verified.user.res.dto";
import { RootState } from "../../store/modules";
import {
  expireAuthentication,
  initializeAuthentication,
  validateAuthentication,
} from "../../store/modules/auth";
import { setUserInfo } from "../../store/modules/userInfo";
import LoginModal from "../Login/LoginModal/LoginModal";
import Portal from "../Portal/Portal";
import VerifyEmailModal from "../VerifyEmail/VerifyEmailModal";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

const JWT_EXPIRY_TIME = 600 * 1000;

interface AuthHelperElement {
  onTokenReceived: (response: AxiosResponse<any, any>) => void;
  onTokenFailure: (error: AxiosError) => void;
}

const AuthContext = createContext<AuthHelperElement>({} as AuthHelperElement);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isEmailVerified } = useSelector((state: RootState) => state.userInfo);
  useEffect(() => {
    axios.get("/api/auth/refresh").then(onTokenReceived).catch(onTokenFailure);
    //jwt expire 1분전에 accessToken 다시 업데이트
  }, []);
  const onTokenFailure = (error: AxiosError) => {
    const errorStatus = error.response!.status;
    if (errorStatus === 401) {
      //error 401
      //refresh token has expired.
      //still show the content to the users so we do not invalidate Authentication
      dispatch(expireAuthentication());
    } else {
      //error 403
      //no userinfo
      dispatch(initializeAuthentication());
    }
  };

  const onTokenReceived = (response: AxiosResponse<any, any>) => {
    const { accessToken, membershipLevel, isEmailVerified } =
      response.data as VerifiedUserResDto;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log("hihihihihihi receive");
    dispatch(validateAuthentication({ accessToken }));
    dispatch(setUserInfo({ isEmailVerified, membershipLevel }));
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  };

  const onSilentRefresh = () => {
    axios
      .get("/api/auth/refresh")
      .then(onTokenReceived)
      .catch((error) => {
        //refresh token이 expire되면 오류가 뜰 것이다.
        //이 경우 사용자는 다시 로그인을 해야 한다.
        dispatch(expireAuthentication());
        console.log(error, "you must login again");
      });
  };
  //if user has loginned to service but the email is not verified,
  //email modal will show up in any website
  return (
    <AuthContext.Provider value={{ onTokenReceived, onTokenFailure }}>
      {isAuthenticated && !isEmailVerified && (
        <Portal>
          <VerifyEmailModal />
        </Portal>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
