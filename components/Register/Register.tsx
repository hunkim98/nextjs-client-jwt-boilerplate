import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { IsNicknameDuplicateBodyDto } from "../../dto/Register/nickname.duplicate.dto";
import { RegisterBodyDto } from "../../dto/Register/register.dto";
import useAlert from "../AlertContext/useAlert";
import { isTelephoneValid } from "../../utils/validateForm";

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
    telephone: string;
  }>({
    name: "",
    nickname: "",
    email: "",
    password1: "",
    password2: "",
    telephone: "",
    isTermsAgreed: false,
    isSnsAgreed: false,
  });
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean>(false);
  const alert = useAlert();

  const onCheckDuplicateNickname = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const data: IsNicknameDuplicateBodyDto = {
      nickname: registerInfo.nickname,
    };
    axios({ method: "POST", url: "/api/users/nickname/duplicate", data: data })
      .then((res) => {
        const isNicknameUsable: boolean = res.data as boolean;
        if (isNicknameUsable) {
          alert.open({ message: "You can use the nickname" });
        } else {
          alert.open({ message: "Somebody else is using the nickname" });
        }
        setIsNicknameUnique(isNicknameUsable);
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

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (registerInfo.password1 !== registerInfo.password2) {
      alert.open({ message: "The passwords are different" });
      return;
    }
    if (!registerInfo.isTermsAgreed) {
      alert.open({ message: "Pleas agree to the terms" });
      return;
    }
    if (!isNicknameUnique) {
      alert.open({ message: "Please check if your nickname is unique" });
    }
    const phoneNumber = registerInfo.telephone.split("-").join("");

    if (!isTelephoneValid(phoneNumber)) {
      alert.open({ message: "Please input the correct telephone number" });
      return;
    }

    const registerBody: RegisterBodyDto = {
      name: registerInfo.name,
      nickname: registerInfo.nickname,
      email: registerInfo.email,
      password: registerInfo.password1,
      telephone: registerInfo.telephone,
      isSnsAgreed: registerInfo.isSnsAgreed,
      isTermsAgreed: registerInfo.isTermsAgreed,
    };
    await axios
      .post("/api/auth/register", registerBody)
      .then((res) => {
        alert.open({
          message: "Verification email has been sent. Please check your email",
        });
        Router.push("/login");
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
  return (
    <div>
      <div>Register</div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          <div>Name</div>
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
          <div>Nickname</div>
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
          <button type="button" onClick={onCheckDuplicateNickname}>
            {!isNicknameUnique ? "Check Duplicate" : "Can be used!"}
          </button>
        </label>
        <label>
          <div>Email</div>
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
          <div>Telephone</div>
          <input
            required={true}
            type="text"
            name="telephone"
            value={registerInfo.telephone}
            onChange={(e) => {
              setRegisterInfo((previous) => {
                return { ...previous, telephone: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          <div>Password</div>
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
          <div>Check password</div>
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
          [Required] I agree to <a href="#">Terms</a> and{" "}
          <a href="#">Privatcy policy</a>
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
          [Optional] I would like to be notified of events
        </label>
        <div>
          <input type="submit" value="register"></input>
        </div>
      </form>
    </div>
  );
};

export default Register;
