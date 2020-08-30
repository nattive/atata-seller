import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import HomeNav from "../HomePage/HomeNav";
import "./SignUp.css";
import HomeFooter from "../HomePage/HomeFooter";
import SignInContainer from './SignInContainer';

export const SignIn = () => {
  const history = useHistory()
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

const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps, null)(SignIn)
