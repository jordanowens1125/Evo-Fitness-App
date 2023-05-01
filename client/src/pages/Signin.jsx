import React from "react";
import Logo from "../assets/logo";

const Signin = () => {
  return (
    <div className="full-height full-width grow aic jcc flex body-color">
      <div className="padding-lg flex-column aic grow margin-lg secondary-bg">
        <span className="flex"></span>
        <Logo value={60} />
        Sign Up
        <button>Sign Up With Google</button>
        <span className="flex-column aic">
          Already Signed up?
          <button className="full-width">Login</button>
        </span>
      </div>
    </div>
  );
};

export default Signin;
