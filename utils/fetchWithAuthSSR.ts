import axios, { Method } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { AuthFromClientServerInterface, setAuthSSR } from "./setAuthSSR";

export const fetchWithAuthSSR = async ({
  context,
  url,
  method,
}: {
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
  url: string;
  method: Method;
}) => {
  const serverSideAuthProps = await setAuthSSR(context);
  if (!("props" in serverSideAuthProps)) {
    throw new Error("invalid getSSP result");
  }
  const { accessToken } =
    serverSideAuthProps.props as AuthFromClientServerInterface;
  return axios({
    method: method,
    url: url,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
