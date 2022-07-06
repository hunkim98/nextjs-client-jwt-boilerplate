import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { IsNicknameDuplicateBodyDto } from "../../dto/Register/nickname.duplicate.dto";
import { RegisterBodyDto } from "../../dto/Register/register.dto";

interface Props {}
const Register: React.FC<Props> = () => {
  const [registerInfo, setRegisterInfo] = useState<{
    name: string;
    nickname: string;
    email: string;
    password1: string;
    password2: string;
    isTermsAgreed: boolean;
    isSnsAgreed: boolean;
  }>({
    name: "",
    nickname: "",
    email: "",
    password1: "",
    password2: "",
    isTermsAgreed: false,
    isSnsAgreed: false,
  });
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(false);

  const onCheckDuplicateNickname = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data: IsNicknameDuplicateBodyDto = {
      nickname: registerInfo.nickname,
    };
    axios({ method: "POST", url: "/api/users/nickname/duplicate", data: data })
      .then((res) => {
        const isNicknameUsable: boolean = res.data as boolean;
        console.log(res);
        setIsNicknameUnique(isNicknameUsable);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (registerInfo.password1 !== registerInfo.password2) {
      alert("비밀번호가 서로 다릅니다");
      return;
    }
    if (!registerInfo.isTermsAgreed) {
      alert("이용약관과 개인정보 처리방침에 동의해주세요");
      return;
    }
    if (!isNicknameUnique) {
      alert("닉네임 중복확인 부탁드립니다");
    }
    if (!/^[A-Za-z0-9]+$/.test(registerInfo.nickname)) {
      alert("닉네임은 영문자와 숫자의 조합으로 만들어주세요");
    }

    const registerBody: RegisterBodyDto = {
      name: registerInfo.name,
      nickname: registerInfo.nickname,
      email: registerInfo.email,
      password: registerInfo.password1,
      isSnsAgreed: registerInfo.isSnsAgreed,
      isTermsAgreed: registerInfo.isTermsAgreed,
    };
    await axios.post("/api/auth/register", registerBody).then((res) => {
      alert("인증 이메일을 보냈습니다. 인증 절차를 진행해주세요");
      Router.push("/login");
    });
  };
  return (
    <div>
      <div>Register</div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          성함
          <input
            required={true}
            type="text"
            name="name"
            value={registerInfo.name}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, name: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          닉네임
          <input
            required={true}
            type="text"
            name="nickname"
            value={registerInfo.nickname}
            onChange={(e) => {
              setIsNicknameUnique(false);
              setRegisterInfo((previous) => {
                return { ...previous, nickname: e.target.value };
              });
            }}
          ></input>
          <button onClick={onCheckDuplicateNickname}>
            {!isNicknameUnique ? "중복 확인" : "확인 완료"}
          </button>
        </label>
        <label>
          이메일(아이디)
          <input
            required={true}
            type="email"
            name="email"
            value={registerInfo.email}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, email: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          비밀번호
          <input
            required={true}
            type="password"
            name="password1"
            value={registerInfo.password1}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, password1: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          비밀번호 확인
          <input
            required={true}
            type="password"
            name="password2"
            value={registerInfo.password2}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, password2: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          <input
            required={true}
            type="checkbox"
            name="isTermsAgreed"
            checked={registerInfo.isTermsAgreed}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, isTermsAgreed: e.target.checked };
              });
            }}
          ></input>
          [필수] <a href="#">이용약관</a>과 <a href="#">개인정보 처리방침</a>에
          동의합니다
        </label>
        <label>
          <input
            type="checkbox"
            name="isSnsAgreed"
            checked={registerInfo.isSnsAgreed}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, isSnsAgreed: e.target.checked };
              });
            }}
          ></input>
          [선택] 이벤트 소식 및 콘텐츠 뉴스레터를 받겠습니다
        </label>
        <div>
          <input type="submit" value="회원가입하기"></input>
        </div>
      </form>
    </div>
  );
};

export default Register;
