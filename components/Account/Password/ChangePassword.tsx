import { SetStateAction, useState } from "react";
import useAlert from "../../AlertContext/useAlert";
import * as S from "./styles";

interface Props {
  updatePassword: (password: string) => Promise<void>;
}

const ChangePassword: React.FC<Props> = ({ updatePassword }) => {
  const alert = useAlert();
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password1 !== password2) {
      alert.open({ message: "비밀번호가 서로 다릅니다!" });
      return;
    } else {
      updatePassword(password1);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <div>비밀번호 변경</div>
          </div>
          <label>
            <div>비밀번호 입력</div>
            <input
              type="password"
              value={password1}
              autoComplete="off"
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
            ></input>
          </label>
          <label>
            <div>비밀번호 입력</div>
            <input
              type="password"
              value={password2}
              autoComplete="off"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            ></input>
          </label>
          <button type="submit">비밀번호 변경하기</button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
