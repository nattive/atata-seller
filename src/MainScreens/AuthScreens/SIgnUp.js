import React from "react";
import { useHistory } from "react-router-dom";
import SignUpContainer from "./SignUpContainer";
import HomeNav from "../HomePage/HomeNav";
import HomeFooter from "../HomePage/HomeFooter";
import "./SignUp.css";

export default function SignUp() {
  let history = useHistory();

  return (
    <>
      <div className="auth-body">
        <HomeNav />
        <SignUpContainer history={history} />
      </div>
      <HomeFooter />
    </>
  );
}
