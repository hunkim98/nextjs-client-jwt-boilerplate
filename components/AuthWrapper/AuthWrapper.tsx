import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isRefreshExpired, setIsRefreshExpired] = useState<boolean>(false);
  useEffect(() => {
    const updateAccessToken = async () => {
      const response = await axios.get("/api/auth/refresh");
      const accessToken = response.data;
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        setIsAuthenticated(true);
        setIsRefreshExpired(false);
        //we have specified response status 403 to having no cookie in browser
      } else if (response.status === 403) {
        setIsAuthenticated(false);
      } else {
        //error 401
        setIsRefreshExpired(true);
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
        console.log("you must login again");
      });
  };

  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <>
      {isRefreshExpired && <AuthExpireModal />}
      {children}
    </>
  );
};

export default AuthWrapper;
