import React, { SetStateAction } from "react";

interface Props {
  message: string;
  setIsProceedToLoginClicked: React.Dispatch<SetStateAction<boolean>>;
}
const AuthExpireModal: React.FC<Props> = ({
  message,
  setIsProceedToLoginClicked,
}) => {
  const onLoginButtonClick = () => {
    setIsProceedToLoginClicked(true);
  };
  return (
    <div>
      <div>AuthExpireModal</div>
      <div>{message}</div>
      <button onClick={onLoginButtonClick}></button>
    </div>
  );
};

export default AuthExpireModal;
