import Router from "next/router";
import * as S from "./styles";

export const NotAuthenticatedPassword: React.FC = () => {
  const onClickFindPassword = () => {
    Router.push("/account/find");
  };
  return (
    <div>
      <div>
        비밀번호 변경 링크가 만료되었습니다. 비밀번호 찾기 페이지에서 다시 인증
        메일을 받으세요.
      </div>
      <div>
        <button onClick={onClickFindPassword}>
          비밀번호 찾기 페이지로 가기
        </button>
      </div>
    </div>
  );
};
