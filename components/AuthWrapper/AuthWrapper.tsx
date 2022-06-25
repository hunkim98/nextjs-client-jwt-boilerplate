import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoginModal from "../Login/LoginModal/LoginModal";
import Portal from "../Portal/Portal";

interface Props {
  //Starting from React 18 children prop is implicityl removed
  //https://solverfox.dev/writing/no-implicit-children/
  children: React.ReactNode;
}

enum ModalMessage {
  EXPIRED_DURING_USE = "로그인 세션이 만료되었으니 다시 로그인해주시기 바랍니다 (재로그인하면 현재 보고 계신 창으로 다시 돌아옵니다)",
  NO_TOKEN = "로그인이 필요한 서비스입니다",
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { isRefreshTokenValid, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <>
      {!isRefreshTokenValid && (
        <Portal>
          <LoginModal
            message={
              isAuthenticated && !isRefreshTokenValid
                ? ModalMessage.EXPIRED_DURING_USE
                : ModalMessage.NO_TOKEN
            }
          />
        </Portal>
      )}
      {children}
    </>
  );
};

export default AuthWrapper;
