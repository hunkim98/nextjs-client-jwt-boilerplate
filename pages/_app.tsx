import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import wrapper from "../store/configureStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
