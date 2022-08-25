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
  EXPIRED_DURING_USE = "The login session has expired. Please login again",
  NO_TOKEN = "You must login to continue",
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
