import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/sign-in.css";

export class signIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: "",
        firstName: "getUser",
        lastName: "getUser",
        locationId: 1,
        password: "",
        email: "get@signon.com",
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log("hello world");
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
    console.log(this.state);
  };

  async handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state.user));
    await fetch("api/User/SignOn", {
      method: "POST",
      body: JSON.stringify(this.state.user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success: ", JSON.stringify(response)))
      .then((error) => console.error("error:", error));
  }

  render() {
    return (
      <div class="card">
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label class="header">Sign In:</label>

              <div class="form-group">
                <label htmlFor="userName" class="subHeader">
                  Username:&nbsp;
                </label>
                <input
                  name="userName"
                  class="form-control"
                  type="text"
                  value={this.state.userName}
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div class="form-group">
                <label htmlFor="password" class="subHeader">
                  Password:&nbsp;
                </label>
                <input
                  name="password"
                  class="form-control"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                ></input>
              </div>

              <div>
                <button className="rounded primaryButton btn" type="submit">
                  Submit
                </button>
              </div>
              <div>
                <Link className="tertiaryText hoverColor" to="ForgotPassword">
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
