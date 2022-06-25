import { NextPage } from "next";
import { useRouter } from "next/router";

const Verification: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  return <div></div>;
};

export default Verification;
