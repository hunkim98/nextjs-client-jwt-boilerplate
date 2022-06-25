import axios from "axios";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeAuthentication } from "../../store/modules/auth";
import { initializeInfo } from "../../store/modules/userInfo";
import { onLogOut } from "../../utils/logout";
import * as S from "./styles";

interface Props {
  setIsEmailVerifyModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const VerifyEmailModal: React.FC<Props> = ({ setIsEmailVerifyModalOpen }) => {
  const dispatch = useDispatch();
  const [isSendCodeClicked, setIsSendCodeClicked] = useState<boolean>(false);
  const onButtonClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await axios.get("/api/auth/register/token");
    setIsSendCodeClicked(true);
  };
  const onLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onLogOut().then(() => {
      dispatch(initializeAuthentication());
      dispatch(initializeInfo());
    });
  };
  const onCloseModalClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsEmailVerifyModalOpen(false);
  };
  return (
    <S.Container>
      <S.ModalContainer>
        <button onClick={onCloseModalClick}>Close</button>
        <div>이메일 인증을 진행해주세요</div>
        <button onClick={onButtonClick} disabled={isSendCodeClicked}>
          {!isSendCodeClicked
            ? "이메일로 인증 코드 재전송하기"
            : "이메일로 코드가 전송되었습니다"}
        </button>
        <button onClick={onLogoutClick}>로그아웃하기</button>
      </S.ModalContainer>
    </S.Container>
  );
};

export default VerifyEmailModal;
