import axios, { Method } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { AuthFromClientServerInterface, setAuthSSR } from "./setAuthSSR";

export const getUserInfoSSR = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const serverSideAuthProps = await setAuthSSR(context);
  if (!("props" in serverSideAuthProps)) {
    throw new Error("invalid getSSP result");
  }
  return serverSideAuthProps.props as AuthFromClientServerInterface;
};
