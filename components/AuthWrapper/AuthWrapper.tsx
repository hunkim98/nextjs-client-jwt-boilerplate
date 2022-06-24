import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedUserResDto } from "../../dto/common/verified.user.res.dto";
import { RootState } from "../../store/modules";
import {
  invalidateAuthentication,
  invalidateRefreshToken,
  validateAuthentication,
  validateRefreshToken,
} from "../../store/modules/auth";
import AuthExpireModal from "../AuthExpireModal/AuthExpireModal";
import LoginModal from "../Login/LoginModal/LoginModal";
import LoginPage from "../Login/LoginPage/LoginPage";
import Portal from "../Portal/Portal";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

enum ModalMessage {
  EXPIRED = "로그인 세션이 만료되었으니 다시 로그인해주시기 바랍니다",
  EXPIRED_DURING_USE = "로그인 세션이 만료되었으니 다시 로그인해주시기 바랍니다 (재로그인하면 현재 보고 계신 창으로 다시 돌아옵니다)",
  NO_TOKEN = "로그인이 필요한 서비스입니다",
}

//600초
const JWT_EXPIRY_TIME = 600 * 1000;

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const [modalMessage, setModalMessage] = useState<string>(
    ModalMessage.NO_TOKEN
  );
  const dispatch = useDispatch();

  const { isRefreshTokenValid, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    axios.get("/api/auth/refresh").then(onTokenReceived);
    //jwt expire 1분전에 accessToken 다시 업데이트
  }, []);

  const onTokenReceived = (response: AxiosResponse<any, any>) => {
    if (response.status === 200) {
      const { accessToken } = response.data as VerifiedUserResDto;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(validateRefreshToken());
      dispatch(validateAuthentication());
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    } else if (response.status === 401) {
      //error 401
      //refresh token has expired.
      //still show the content to the users so we do not invalidate Authentication
      if (isAuthenticated) {
        setModalMessage(ModalMessage.EXPIRED_DURING_USE);
      } else {
        setModalMessage(ModalMessage.EXPIRED);
      }
      dispatch(invalidateRefreshToken());
    } else {
      //we have specified response status 403 to having no cookie in browser
      //403 means no cookie ever existed
      setModalMessage(ModalMessage.NO_TOKEN);
      dispatch(invalidateAuthentication());
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
        setModalMessage(ModalMessage.EXPIRED);
        dispatch(invalidateRefreshToken());
        console.log(error, "you must login again");
      });
  };

  return (
    <>
      {isRefreshTokenValid && (
        <Portal>
          <LoginModal
            message={modalMessage}
            onTokenReceived={onTokenReceived}
          />
        </Portal>
      )}
      {children}
    </>
  );
};

export default AuthWrapper;
