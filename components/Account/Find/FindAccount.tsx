import axios from "axios";
import { ForgotPasswordBodyDto } from "../../../dto/Password/forgot.password.dto";
import * as S from "./styles";
import Router from "next/router";
import { useState } from "react";
import { PostEmailDto } from "../../../dto/User/user.dto";
import { PostEmailResDto } from "../../../dto/User/user.res.dto";
import useAlert from "../../AlertContext/useAlert";

interface Props {}

enum FindAccountType {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
}

const FindAccount: React.FC<Props> = () => {
  const alert = useAlert();
  const [userEmail, setUserEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [findAccountType, setFindAccountType] = useState<FindAccountType>(
    FindAccountType.EMAIL
  );
  const [emailResult, setEmailResult] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (findAccountType === FindAccountType.EMAIL) {
      setNickname(event.target.value);
    } else if (findAccountType === FindAccountType.PASSWORD) {
      setUserEmail(event.target.value);
    }
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    switch (findAccountType) {
      case FindAccountType.EMAIL:
        onClickFindEmail();
        break;
      case FindAccountType.PASSWORD:
        onClickResetPassword();
        break;
    }
  };

  const onClickFindEmail = () => {
    const data: PostEmailDto = { nickname };
    axios
      .post("/api/users/email", data)
      .then((res) => {
        const data = res.data as PostEmailResDto;
        setEmailResult(data.email);
      })
      .catch((err) => {
        const { status, data } = err.response;
        const message = data.message;
        if (message) {
          alert.open({ message });
        } else {
          console.log(err);
        }
      });
  };

  const onClickResetPassword = () => {
    axios
      .post("/api/auth/password/forgot", { email: userEmail })
      .then((res) => {
        alert.open({
          message: "비밀번호 변경 이메일이 보내졌습니다",
          buttons: [
            {
              label: "확인",
              onClick: () => {
                alert.close();
                Router.push("/login");
              },
            },
          ],
        });
      })
      .catch((err) => {
        const { status, data } = err.response;
        const message = data.message;
        if (message) {
          alert.open({ message });
        } else {
          console.log(err);
        }
      });
  };

  const inputValue = (type: FindAccountType) => {
    switch (type) {
      case FindAccountType.EMAIL:
        return nickname;
      case FindAccountType.PASSWORD:
        return userEmail;
    }
  };

  const inputLabelText = (type: FindAccountType) => {
    switch (type) {
      case FindAccountType.EMAIL:
        return "nickname";
      case FindAccountType.PASSWORD:
        return "password";
    }
  };

  const submitButtonText = (type: FindAccountType) => {
    switch (type) {
      case FindAccountType.EMAIL:
        return "find id";
      case FindAccountType.PASSWORD:
        return "send verification email";
    }
  };

  const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Router.push("/register");
  };

  const onClickLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Router.push("/login");
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <div>Find id/password</div>
            <div>
              <button type="button" onClick={onClickRegister}>
                register
              </button>
              <button type="button" onClick={onClickLogin}>
                login
              </button>
            </div>
          </div>
          <label>
            <div>Choose</div>
            <div>
              <div style={{ width: "50%" }}>
                <div>id</div>
                <input
                  type="checkbox"
                  checked={findAccountType === FindAccountType.EMAIL}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFindAccountType(FindAccountType.EMAIL);
                      setUserEmail("");
                      setEmailResult("");
                    }
                  }}
                />
              </div>
              <div style={{ width: "50%" }}>
                <div>password</div>
                <input
                  type="checkbox"
                  checked={findAccountType === FindAccountType.PASSWORD}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFindAccountType(FindAccountType.PASSWORD);
                      setNickname("");
                      setEmailResult("");
                    }
                  }}
                />
              </div>
            </div>
          </label>
          <label>
            <div>{inputLabelText(findAccountType)}</div>
            <input
              type={
                findAccountType === FindAccountType.PASSWORD ? "email" : "text"
              }
              value={inputValue(findAccountType)}
              onChange={handleInputChange}
            ></input>
          </label>
          {emailResult && (
            <div style={{ textAlign: "center" }}>
              Your email is {emailResult}
            </div>
          )}
          <button>{submitButtonText(findAccountType)}</button>
        </form>
      </div>
    </>
  );
};

export default FindAccount;
