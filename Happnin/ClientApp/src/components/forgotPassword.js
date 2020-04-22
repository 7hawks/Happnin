import React, { Component } from "react";
import "../styles/ForgotPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";

//TODO: actually send an email, right now this submit goes nowhere

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showMessage: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    this.props.history.push("/reset-email-sent");
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h3>Forgot your password? We'll email you a link to reset it</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email" class="subHeader">
            Email:&nbsp;
          </label>
          <input
            name="email"
            type="email"
            className="rounded"
            value={this.state.email}
            onChange={this.handleInputChange}
          ></input>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    );
  }
}
