import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FetchEventData } from "./FetchEventData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNameSearch: "",
      eventZipSearch: "",
      eventCategory: "",
      startDate: new Date(),
    };
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  

  render() {
    return (
      <div className="container-fluid card">
        <h1 className="header">Events</h1>
        <div className="text-center">

          <div id = "filterName">
            <label className="subHeader">
              Search by event name:&nbsp;{this.state.eventNameSearch}
            </label>
            <input
              type="text"
              className="rounded"
              value={this.state.eventNameSearch}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id = "filterZip">
            <label className="subHeader">
              &nbsp;&nbsp;Search by zip code:&nbsp;{this.state.eventZipSearch}
            </label>
            <input
              type="text"
              className="rounded"
              value={this.state.eventZipSearch}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id = "filterCategory">
            <label className="subHeader">
              &nbsp;&nbsp;Events by category:&nbsp;{this.state.eventSearch}
            </label>
            <select
              className="rounded"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Culture">Culture</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          <div id = "filterDate">
            <label className="subHeader">
              &nbsp;&nbsp;Events by date:&nbsp;{this.state.eventSearch}
            </label>
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            />
          </div>

        </div>
        <br />
        <div>
          <FetchEventData></FetchEventData>
        </div>
      </div>
    );
  }
}
