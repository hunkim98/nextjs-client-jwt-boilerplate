import React, { SetStateAction } from "react";

interface Props {
  setIsProceedToLoginClicked: React.Dispatch<SetStateAction<boolean>>;
}
const AuthExpireModal: React.FC<Props> = ({ setIsProceedToLoginClicked }) => {
  const onLoginButtonClick = () => {
    setIsProceedToLoginClicked(true);
  };
  return (
    <div>
      <div>AuthExpireModal</div>
      <button onClick={onLoginButtonClick}></button>
    </div>
  );
};

export default AuthExpireModal;
