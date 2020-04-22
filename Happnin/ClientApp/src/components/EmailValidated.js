import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmailValidated = () => {
  return (
    <div className="container-fluid">
      <h4>Your email has been validated!</h4>
      <Link to="/sign-in">Sign In</Link>
    </div>
  );
};
export default EmailValidated;
