import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./EditAccount.css";

export class EditAccount extends Component {
  constructor(props) {
    super(props);

    //TODO: eventually remove the hardcoded values
    //These values are temporarily hard-coded
    //TODO: make sure regex is used for each input to only accept valid values
    //try using Moment.js for dates
    //update user infromation in database
    this.state = {
      user: {
        userName: "fakeUser1",
        firstName: "Jane",
        lastName: "Doe",
        city: "Spokane",
        birthday: "02/23/1995",
        email: "fakeemail@gmail.com",
        phone: "(509) 555-5555",
        eventsOfInterest: ["Music", "Comedy", "Cultural"]
      },
      editOtherFields: false,
      anchorClicked: false
    };
  }

  //this makes the fields editable when they're clicked on
  handleEditOtherFields = () =>
    this.setState(currentState => ({
      editOtherFields: !currentState.editOtherFields,
      anchorClicked: !this.state.anchorClicked
    }));

  render() {
    return (
      <div id="editAccount" className="container-fluid">
        <h3 className="text-center">Edit Account</h3>
        <form id="editAccount">
          <div className="row justify-content-center">
            <div className="col-3 border rounded white-div">
              <div className="row mx-auto">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-and-networking/480/02_social_medis_profile_female_placeholder_image_profile_female-512.png"
                  className="img-fluid mt-0"
                  alt="profile avatar"
                ></img>
                <div>
                  <label className="mx-auto" htmlFor="profile_pic">
                    Change profile picture:
                  </label>
                  <input
                    id="profile_pic"
                    className="text-center"
                    name="profile_pic"
                    type="file"
                  />
                </div>
                <h3 className="header mx-auto">
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </h3>
              </div>
              <div className="row-3">
                <div className="col rounded white-div align-middle">
                  <h4>User Bio</h4>
                  <textarea
                    name="bio"
                    form="editAccount"
                    placeholder="I think I'm stuck in a simulation"
                    disabled={!this.state.editOtherFields}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-5 ml-2 float-right border rounded white-div my-auto">
              <h1 id="aboutHeading" className="header">
                ABOUT
              </h1>
              <a
                href = "void(0)"
                className="float-right border btn mt-2"
                role="button"
                onClick={this.handleEditOtherFields.bind(this)}
              >
                {this.state.anchorClicked ? "Done" : "Edit fields"}
              </a>
              <div>
                <label htmlFor="usernameInput">Username:&nbsp;</label>
                <input
                  name="usernameInput"
                  type="text"
                  pattern="^[A-Za-z0-9]{4,15}$"
                  title="Username should only contain lowercase letters, uppercase letters, and numbers. It must be between 4 and 15 characters."
                  placeholder={this.state.user.userName}
                  disabled={!this.state.editOtherFields}
                />
              </div>
              <div>
                <label htmlFor="fNameInput">First name:&nbsp;</label>
                <input
                  name="fNameInput"
                  type="text"
                  placeholder={this.state.user.firstName}
                  pattern="^[A-Za-z]{1,40}$"
                  title="First name should only contain lowercase and uppercase letters. It must be between 1 and 40 characters."
                  disabled={!this.state.editOtherFields}
                />
              </div>
              <div>
                <label htmlFor="lNameInput">Last name:&nbsp;</label>
                <input
                  name="lNameInput"
                  type="text"
                  pattern="^[A-Za-z]{1,40}$"
                  title="Last name should only contain lowercase and uppercase letters. It must be between 1 and 40 characters."
                  placeholder={this.state.user.lastName}
                  disabled={!this.state.editOtherFields}
                />
              </div>
              <div>
                <label htmlFor="cityInput">City:&nbsp;</label>
                <input
                  name="cityInput"
                  type="text"
                  pattern="^[A-Za-z/\s]{1,50}$"
                  placeholder={this.state.user.city}
                  title="City should only contain lowercase and uppercase letters. It must be between 1 and 50 characters."
                  disabled={!this.state.editOtherFields}
                />
              </div>
              <div>
                <label htmlFor="emailInput">Email:&nbsp;</label>
                <input
                  name="emailInput"
                  type="email"
                  title="Email should be in the format example@mail.com"
                  placeholder={this.state.user.email}
                  disabled={!this.state.editOtherFields}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="float-right mt-2"></div>
      </div>
    );
  }
}
