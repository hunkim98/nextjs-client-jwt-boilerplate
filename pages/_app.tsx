import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import wrapper from "../store/configureStore";
import { AuthContextProvider } from "../components/AuthProvider/AuthProvider";
import { AlertContextProvider } from "../components/AlertContext/AlertContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
      <AlertContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </AlertContextProvider>
    </GoogleOAuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
