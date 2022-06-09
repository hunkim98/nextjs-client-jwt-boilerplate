import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import {
  invalidateAuthentication,
  invalidateRefreshToken,
  validateAuthentication,
  validateRefreshToken,
} from "../../store/modules/auth";
import AuthExpireModal from "../AuthExpireModal/AuthExpireModal";
import Login from "../Login/Login";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

enum ModalMessage {
  EXPIRED = "로그인 세션이 만료되었으니 다시 로그인해주시기 바랍니다 (재로그인하면 현재 보고 계신 창으로 다시 돌아옵니다)",
  NO_TOKEN = "로그인이 필요한 서비스입니다",
}

//600초
const JWT_EXPIRY_TIME = 600 * 1000;

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const [isProceedToLoginClicked, setIsProceedToLoginClicked] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>(
    ModalMessage.NO_TOKEN
  );
  const dispatch = useDispatch();

  const isRefreshTokenValid = useSelector(
    (state: RootState) => state.auth.isRefreshTokenValid
  );
  useEffect(() => {
    axios.get("/api/auth/refresh").then(onTokenReceived);
    //jwt expire 1분전에 accessToken 다시 업데이트
  }, []);

  const onTokenReceived = (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      const accessToken = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(validateRefreshToken());
      dispatch(validateAuthentication());
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      //we have specified response status 403 to having no cookie in browser
      //403 means no cookie ever existed
    } else if (response.status === 403) {
      setModalMessage(ModalMessage.NO_TOKEN);
      dispatch(invalidateAuthentication());
      dispatch(invalidateRefreshToken());
    } else {
      //error 401
      //refresh token has expired.
      //still show the content to the users so we do not invalidate Authentication
      setModalMessage(ModalMessage.EXPIRED);
      dispatch(invalidateRefreshToken());
    }
  };

  const onSilentRefresh = () => {
    axios
      .get("/api/auth/refresh")
      .then(onTokenReceived)
      .catch((error) => {
        //refresh token이 expire되면 오류가 뜰 것이다.
        //이 경우 사용자는 다시 로그인을 해야 한다.
        dispatch(invalidateRefreshToken());
        console.log(error, "you must login again");
      });
  };

  if (isProceedToLoginClicked) {
    return <Login redirectUrl={undefined} />;
  }
  return (
    <>
      {!isRefreshTokenValid && (
        <AuthExpireModal
          message={modalMessage}
          setIsProceedToLoginClicked={setIsProceedToLoginClicked}
        />
      )}
      {children}
    </>
  );
};

export default AuthWrapper;
