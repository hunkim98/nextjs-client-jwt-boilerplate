import axios from "axios";
import { GetServerSideProps } from "next";
import { VerifiedUserResDto } from "../dto/common/verified.user.res.dto";
import wrapper from "../store/configureStore";
import {
  initializeAuthentication,
  validateAuthentication,
} from "../store/modules/auth";
import { setUserInfo } from "../store/modules/userInfo";

export interface AuthFromClientServerInterface {
  accessToken: string | null;
  membershipLevel: number | null;
}

export const setAuthSSR: GetServerSideProps<AuthFromClientServerInterface> =
  //pre render everything inside
  wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
    try {
      let accessTokenData = store.getState().auth.accessToken;
      let membershipLevelData = null;
      if (!accessTokenData) {
        const refreshCookie = req.headers.cookie;
        if (refreshCookie) {
          const API_URL = process.env.API_URL!;
          const { accessToken, membershipLevel, isEmailVerified } = (
            await axios.get(API_URL.concat("/auth/refresh"), {
              headers: { Cookie: refreshCookie },
            })
          ).data as VerifiedUserResDto;
          if (isEmailVerified) {
            accessTokenData = accessToken;
            store.dispatch(validateAuthentication({ accessToken }));
            store.dispatch(setUserInfo({ membershipLevel, isEmailVerified }));
            membershipLevelData = membershipLevel;
          }
        }
      }
      if (!accessTokenData) {
        store.dispatch(initializeAuthentication());
      }
      return {
        props: {
          accessToken: accessTokenData,
          membershipLevel: membershipLevelData,
        },
      };
    } catch (error) {
      store.dispatch(initializeAuthentication());
      return { props: { accessToken: null, membershipLevel: null } };
    }
  });
