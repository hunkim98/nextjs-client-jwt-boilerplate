import axios from "axios";
import Router from "next/router";
import React, { SetStateAction, useCallback, useState } from "react";
import { PutUserProfileDto } from "../../dto/User/user.dto";
import { GetUserAccountResDto } from "../../dto/User/user.res.dto";
import { isTelephoneValid } from "../../utils/validateForm";
import useAlert from "../AlertContext/useAlert";
import * as S from "./styles";

interface Props {
  accountInfo: GetUserAccountResDto;
  changeableAccountInfo: PutUserProfileDto;
  setChangeableAccountInfo: React.Dispatch<SetStateAction<PutUserProfileDto>>;
  getAccountInfo: () => Promise<void>;
}

const Account: React.FC<Props> = ({
  accountInfo,
  getAccountInfo,
  setChangeableAccountInfo,
  changeableAccountInfo,
}) => {
  const alert = useAlert();
  const updateAccountInfo = useCallback(async (data: PutUserProfileDto) => {
    return axios.put("/api/users/account", data).then((res) => {
      alert.open({ message: "수정이 반영되었습니다" });
      getAccountInfo();
    });
  }, []);
  const [isTelephoneInputValid, setIsTelephoneInputValid] =
    useState<boolean>(false);

  const onClickChangePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    Router.push("/account/password");
  };
  return (
    <div>
      <div>
        <div>Account Info</div>
      </div>
      <form>
        <label>
          <div>Name</div>
          <input
            type="text"
            disabled={true}
            defaultValue={accountInfo.name}
          ></input>
        </label>
        <label>
          <div>Nickname</div>
          <input
            type="text"
            disabled={true}
            defaultValue={accountInfo.nickname}
          ></input>
        </label>
        <label>
          <div>Email(ID)</div>
          <input
            type="text"
            disabled={true}
            defaultValue={accountInfo.email}
          ></input>
        </label>
        <label>
          <div>Telephone</div>
          <input
            type="text"
            value={changeableAccountInfo.telephone}
            onChange={(e) => {
              setChangeableAccountInfo((prev) => {
                return { ...prev, telephone: e.target.value };
              });
              setIsTelephoneInputValid(isTelephoneValid(e.target.value));
            }}
          ></input>
          <button
            type="button"
            onClick={(e) => {
              if (!isTelephoneInputValid) {
                alert.open({ message: "올바른 휴대폰 번호를 입력해주세요" });
                return;
              }
              updateAccountInfo({
                isSnsAgreed: Boolean(accountInfo.isSnsAgreed),
                telephone: changeableAccountInfo.telephone,
              });
            }}
          >
            Modify
          </button>
        </label>
        <label>
          <div>Password</div>
          <button type="button" onClick={onClickChangePassword}>
            Change
          </button>
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              name="isTermsAgreed"
              defaultChecked={changeableAccountInfo.isSnsAgreed}
              onChange={(e) => {
                updateAccountInfo({
                  isSnsAgreed: !changeableAccountInfo.isSnsAgreed,
                  telephone: accountInfo.telephone,
                });
              }}
            ></input>
            <div>[Optional] I would like to be notified of events</div>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Account;
