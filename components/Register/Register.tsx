import axios from "axios";
import Router from "next/router";
import { RegisterBodyDto } from "../../dto/Register/register.dto";

interface Props {}
const Register: React.FC<Props> = () => {
  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      nickname: { value: string };
      email: { value: string };
      password1: { value: string };
      isTermsAgreed: { value: boolean; checked: boolean };
      isSnsAgreed: { value: boolean; checked: boolean };
    };
    const name = target.name.value;
    const nickname = target.nickname.value;
    const email = target.email.value;
    const password = target.password1.value;
    const isTermsAgreed = target.isTermsAgreed.checked;
    const isSnsAgreed = target.isSnsAgreed.checked;
    console.log(target.isTermsAgreed.checked);
    try {
      const registerBody: RegisterBodyDto = {
        nickname,
        name,
        email,
        password,
        isSnsAgreed,
        isTermsAgreed,
      };
      await axios.post("/api/auth/register", registerBody);
      Router.push("/");
    } catch (error) {}
  };
  return (
    <div>
      <div>Register</div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          이름 <input type="text" name="name"></input>
        </label>
        <label>
          닉네임 <input type="text" name="nickname"></input>
        </label>
        <label>
          이메일(아이디) <input type="email" name="email"></input>
        </label>
        <label>
          비밀번호 <input type="password" name="password1"></input>
        </label>
        <label>
          비밀번호 확인 <input type="password" name="password2"></input>
        </label>
        <label>
          <input type="checkbox" name="isTermsAgreed"></input>
          [필수] <a href="#">이용약관</a>과 <a href="#">개인정보 처리방침</a>에
          동의합니다
        </label>
        <label>
          <input type="checkbox" name="isSnsAgreed"></input>
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
