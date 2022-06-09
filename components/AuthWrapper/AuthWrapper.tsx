import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import {
  invalidateAuthentication,
  invalidateRefreshToken,
  validateRefreshToken,
} from "../../store/modules/auth";
import AuthExpireModal from "../AuthExpireModal/AuthExpireModal";
import Login from "../Login/Login";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

//600초
const JWT_EXPIRY_TIME = 600 * 1000;

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const [isProceedToLoginClicked, setIsProceedToLoginClicked] =
    useState<boolean>(false);
  const isRefreshTokenValid = useSelector(
    (state: RootState) => state.auth.isRefreshTokenValid
  );
  useEffect(() => {
    const updateAccessToken = async () => {
      const response = await axios.get("/api/auth/refresh");
      const accessToken = response.data;
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        dispatch(validateRefreshToken());
        //we have specified response status 403 to having no cookie in browser
        //403 means no cookie ever existed
      } else if (response.status === 403) {
        dispatch(invalidateAuthentication());
        // setIsAuthenticated(false);
      } else {
        //error 401
        dispatch(invalidateRefreshToken());
      }
    };
    updateAccessToken();
    //jwt expire 1분전에 accessToken 다시 업데이트
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  }, []);

  const onSilentRefresh = () => {
    axios
      .get("/api/auth/refresh")
      .then((res) => {
        const accessToken = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      })
      .catch((error) => {
        //refresh token이 expire되면 오류가 뜰 것이다.
        //이 경우 사용자는 다시 로그인을 해야 한다.
        console.log(error, "you must login again");
      });
  };

  if (isProceedToLoginClicked) {
    return <Login />;
  }
  return (
    <>
      {!isRefreshTokenValid && (
        <AuthExpireModal
          setIsProceedToLoginClicked={setIsProceedToLoginClicked}
        />
      )}
      {children}
    </>
  );
};

export default AuthWrapper;
