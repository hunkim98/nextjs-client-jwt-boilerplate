import { useRouter } from "next/router";
import React from "react";

function signup() {
  const router = useRouter();
  const { socialEmail, loginType } = router.query;
  const onCreateAccount = () => {
    //remember to add socialEmail to adding user
    if (socialEmail) {
    }
    if (loginType) {
    }
  };
  return (
    <div>
      <div>signup</div>
      <input placeholder={socialEmail && (socialEmail as string)}></input>
      <div>{socialEmail}</div>
    </div>
  );
}

export default signup;
