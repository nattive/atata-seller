import React from "react";
import { useHistory } from "react-router-dom";
import SignInContainer from "./SignInContainer";
import HomeNav from "../HomePage/HomeNav";
import "./SignUp.css";
import HomeFooter from "../HomePage/HomeFooter";

export default function SignIn() {
  let history = useHistory();

  return (
    <>
      <div className="auth-body">
        <HomeNav />
        <SignInContainer history={history} />{" "}
      </div>
      <HomeFooter />
    </>
  );
}
