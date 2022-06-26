import { GetServerSideProps, NextPage } from "next";
import LoginPage from "../components/Login/LoginPage/LoginPage";
import { getUserInfoSSR } from "../utils/getUserInfoSSR";

type PageProps = {};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, membershipLevel } = await getUserInfoSSR(context);
  if (accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { data: null } };
};

const Login: NextPage<PageProps> = () => {
  return <LoginPage redirectUrl="/" />;
};

export default Login;
