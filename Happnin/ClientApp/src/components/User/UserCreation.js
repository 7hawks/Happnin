import React, { Component } from "react";
import "../../styles/UserCreation.css";
import { Button } from "reactstrap";
import Recaptcha from "react-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import { ZipCode } from "../ZipCode";

//use bootstrap to make page prettier
//send email confirmation
//profile picture needs to be stored somewhere
//try to put password value updating into one function
//make sure user can't submit form if passwords don't match

export class UserCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        locationId: 1,
        password: "",
        email: "",
      },
      passwordConfirm: "",
      loading: true,
      showZip: false,
      showUser: false,
      showPassReq: false,
      showConfirmReq: false,
      isValidZip: false,
      isValidUserAlpha: false,
      isValidUserMin: false,
      isValidUserMax: true,
      isValidPassLower: false,
      isValidPassUpper: false,
      isValidPassNum: false,
      isValidPassMin: false,
      isValidPassMax: true,
      isValidPassSpecial: false,
      passwordsMatch: false,
      reCaptchaResponse: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
    console.log(this.user);
  };

  async handleSubmit(event) {
    event.preventDefault();
    if (
      !this.state.reCaptchaResponse ||
      this.state.reCaptchaResponse.trim().length === 0
    ) {
      alert("Please verify that you're not a robot!");
      return { success: false, message: "Captcha is required" };
    }
    if (!this.state.passwordsMatch) {
      alert("Please make sure that password fields match!");
      return { success: false, message: "Password fields don't match" };
    }
    console.log(JSON.stringify(this.state.user));
    await fetch("api/User", {
      method: "POST",
      body: JSON.stringify(this.state.user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success: ", JSON.stringify(response)))
      .then((error) => console.error("error:", error));
    this.props.history.push("/pending-email");
  }

  //these show or hide dropdowns if input is clicked on
  showOrHideZip = () =>
    this.setState((currentState) => ({ showZip: !currentState.showZip }));
  showOrHideUser = () =>
    this.setState((currentState) => ({ showUser: !currentState.showUser }));
  showOrHidePassReq = () =>
    this.setState((currentState) => ({
      showPassReq: !currentState.showPassReq,
    }));
  showOrHideConfirmPass = () =>
    this.setState((currentState) => ({
      showConfirmReq: !currentState.showConfirmReq,
    }));

  //this makes sure that the zip code is valid, then add the valid or invalid classes accordingly
  validateZip = (event) => {
    const target = event.target;
    const zipValue = target.value;
    zipValue.length === 5
      ? this.setState({ isValidZip: true })
      : this.setState({ isValidZip: false });
  };
  ////these show or hide dropdowns if input is clicked on
  //showOrHideZip = () =>
  //  this.setState(currentState => ({ showZip: !currentState.showZip }));
  //showOrHideUser = () =>
  //  this.setState(currentState => ({ showUser: !currentState.showUser }));
  //showOrHidePassReq = () =>
  //  this.setState(currentState => ({ showPassReq: !currentState.showPassReq }));
  //showOrHideConfirmPass = () =>
  //  this.setState(currentState => ({
  //    showConfirmReq: !currentState.showConfirmReq
  //  }));

  ////this makes sure that the zip code is valid, then add the valid or invalid classes accordingly
  //validateZip = event => {
  //  const target = event.target;
  //  const zipValue = target.value;
  //  zipValue.length === 5
  //    ? this.setState({ isValidZip: true })
  //    : this.setState({ isValidZip: false });
  //};
  //this makes sure the username is valid, then add the valid or invalid classes accordingly
  validateUsername = (event) => {
    const target = event.target;
    const usernameValue = target.value;
    let regAlpha = new RegExp("^[A-Za-z0-9]*$");
    regAlpha.test(usernameValue) && usernameValue.length > 0
      ? this.setState({ isValidUserAlpha: true })
      : this.setState({ isValidUserAlpha: false });
    usernameValue.length >= 4
      ? this.setState({ isValidUserMin: true })
      : this.setState({ isValidUserMin: false });
    usernameValue.length <= 15
      ? this.setState({ isValidUserMax: true })
      : this.setState({ isValidUserMax: false });
  };

  //for some reason handleInputChange isn't working for passwords, so this is used to set password
  onPassChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        password: event.target.value,
      },
    });
    this.handleInputChange(event);
  };

  //see function description above, same but for confirming password
  onPassConfirmChange = (event) => {
    this.setState({
      passwordConfirm: event.target.value,
    });
  };

  //makes sure the password is valid, then add the valid or invalid classes accordingly
  validatePassword = (event) => {
    const target = event.target;
    const passValue = target.value;
    let regLower = new RegExp("[a-z]");
    regLower.test(passValue)
      ? this.setState({ isValidPassLower: true })
      : this.setState({ isValidPassLower: false });
    let regUpper = new RegExp("[A-Z]");
    regUpper.test(passValue)
      ? this.setState({ isValidPassUpper: true })
      : this.setState({ isValidPassUpper: false });
    let regNum = new RegExp("[0-9]");
    regNum.test(passValue)
      ? this.setState({ isValidPassNum: true })
      : this.setState({ isValidPassNum: false });
    passValue.length >= 8
      ? this.setState({ isValidPassMin: true })
      : this.setState({ isValidPassMin: false });
    passValue.length <= 30
      ? this.setState({ isValidPassMax: true })
      : this.setState({ isValidPassMax: false });
    let regSpecial = new RegExp('[!@#$%^&*(),.?":{}|<>]');
    regSpecial.test(passValue)
      ? this.setState({ isValidPassSpecial: true })
      : this.setState({ isValidPassSpecial: false });
  };

  //makes sure the password entered and re-entered match
  checkPasswordsMatch = () => {
    let pass = this.state.user.password;
    let passConfirm = this.state.passwordConfirm;

    if (pass === passConfirm) {
      this.setState({ passwordsMatch: true });
    } else {
      this.setState({ passwordsMatch: false });
    }
  };

  //for the recaptcha, makign sure that the user clicks on it before submitting
  verifyCallback = (response) => {
    console.log(response);
    this.setState({
      reCaptchaResponse: response,
    });
  };

  //also for the recaptcha to prevent form from submitting without being clicked
  callback = () => {
    console.log("Done!");
  };

  render() {
    return (
      <div class="card">
        <div id="accountform" className="container-fluid">
          <h1 class="header">Sign Up!</h1>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label>First name:</label>
              <input
                id="fname"
                className="form-control"
                name="firstName"
                type="text"
                pattern="^[A-Za-z]{1,40}$"
                placeholder="Jane"
                value={this.state.user.firstName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last name:</label>
              <input
                id="lname"
                className="form-control"
                name="lastName"
                type="text"
                pattern="^[A-Za-z]{1,40}$"
                placeholder="Doe"
                value={this.state.user.lastName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                id="username"
                className="form-control"
                name="userName"
                type="text"
                pattern="^[A-Za-z0-9]{4,15}$"
                placeholder="user123"
                value={this.state.user.userName}
                onChange={this.handleInputChange}
                onFocus={this.showOrHideUser}
                onBlur={this.showOrHideUser}
                onKeyUp={this.validateUsername}
                required
              />
              {this.state.showUser && (
                <p
                  id="userAlphaNum"
                  className={this.state.isValidUserAlpha ? "valid" : "invalid"}
                >
                  Username must only contain letters and numbers
                </p>
              )}
              {this.state.showUser && (
                <p
                  id="userMin"
                  className={this.state.isValidUserMin ? "valid" : "invalid"}
                >
                  Username must be have a minimum length of 4
                </p>
              )}
              {this.state.showUser && (
                <p
                  id="userMax"
                  className={this.state.isValidUserMax ? "valid" : "invalid"}
                >
                  User must have a maximum length of 15
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                id="email"
                className="form-control"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={this.state.user.email}
                onChange={this.handleInputChange}
                required
              />
              </div>

                <ZipCode/>


          /*  <div className="form-group">
              <label>Zip code: </label>
              <input
                id="zip"
                className="form-control rounded"
                name="zipcode"
                type="number"
                pattern="^\d{5}$"
                placeholder="99004"
                onFocus={this.showOrHideZip}
                onBlur={this.showOrHideZip}
                onKeyUp={this.validateZip}
                onChange={this.handleInputChange}
                required
              />
              {this.state.showZip && (
                <p
                  id="zipDigits"
                  className={this.state.isValidZip ? "valid" : "invalid"}
                >
                  Zip code must be 5 digits
                </p>
              )}
            </div> */
            <div className="form-group">
              <label hmtlFor="profile_pic">Profile Picture: </label>
              <br />
              <input id="profile_pic" name="profile_pic" type="file" />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                id="password"
                className="form-control"
                name="password"
                type="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$"
                onChange={this.onPassChange}
                onFocus={this.showOrHidePassReq}
                onBlur={this.showOrHidePassReq}
                onKeyUp={this.validatePassword}
                required
              />
              {this.state.showPassReq && (
                <p
                  id="lower"
                  className={this.state.isValidPassLower ? "valid" : "invalid"}
                >
                  At least one lowercase letter
                </p>
              )}
              {this.state.showPassReq && (
                <p
                  id="upper"
                  className={this.state.isValidPassUpper ? "valid" : "invalid"}
                >
                  At least one uppercase letter
                </p>
              )}
              {this.state.showPassReq && (
                <p
                  id="number"
                  className={this.state.isValidPassNum ? "valid" : "invalid"}
                >
                  A number
                </p>
              )}
              {this.state.showPassReq && (
                <p
                  id="special"
                  className={
                    this.state.isValidPassSpecial ? "valid" : "invalid"
                  }
                >
                  At least one special character
                </p>
              )}
              {this.state.showPassReq && (
                <p
                  id="minlength"
                  className={this.state.isValidPassMin ? "valid" : "invalid"}
                >
                  Minimum 8 characters
                </p>
              )}
              {this.state.showPassReq && (
                <p
                  id="maxlength"
                  className={this.state.isValidPassMax ? "valid" : "invalid"}
                >
                  Maximum 30 characters
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Confirm password:</label>
              <input
                id="passwordConfirm"
                className="form-control"
                name="passwordConfirm"
                type="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$"
                onChange={this.onPassConfirmChange}
                onKeyUp={this.checkPasswordsMatch}
                onFocus={this.showOrHideConfirmPass}
                onBlur={this.showOrHideConfirmPass}
                errorMessage="Passwords do not match"
                validate={this.state.passwordsMatch}
                required
              />
              {this.state.showConfirmReq && (
                <p
                  id="match"
                  className={this.state.passwordsMatch ? "valid" : "invalid"}
                >
                  Passwords match
                </p>
              )}
            </div>
            <div className="form-group">
              <input type="checkbox" name="13orolder" required />
              <label htmlFor="13orolder">&nbsp;I am 13 or older</label>
            </div>
            <div className="form-group">
              <Recaptcha
                sitekey="6Lf3W9gUAAAAABostmeeDYxgtLyJpsckK4Bei6I-"
                render="explicit"
                onloadCallback={this.callback}
                verifyCallback={this.verifyCallback}
                required
              />
              <br />
            </div>
            <Button className="btn primaryButton" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
