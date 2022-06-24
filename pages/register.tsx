import axios from "axios";
import { NextPage } from "next";
import React from "react";
import Register from "../components/Register/Register";
import { RegisterBodyDto } from "../dto/Register/register.dto";

const RegisterPage: NextPage = () => {
  return <Register />;
};

export default RegisterPage;
