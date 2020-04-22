import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-time-picker/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import authService from '../api-authorization/AuthorizeService';
import { Location } from "../Location.js";


export class SubmitEvent extends Component {
  static displayName = SubmitEvent.name;

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      location: null,
      event: {
        name: "",
        description: "",
        locationId: 1,
        categoryId: 1,
        hostId: "",
        eventTime: "2020-02-26T05:21:52.102Z",
        endTime: "2020-02-27T05:21:52.102Z",
        cost: 42.0,
        ageRestriction: 500
      }
      // redirectToHome: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state.event));
    await fetch("api/Event", {
      method: "POST",
      body: JSON.stringify(this.state.event),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => console.log("Success: ", JSON.stringify(response)))
      .then(error => console.error("error:", error));
    // this.setState({redirectToHome: true})
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target.type)
    console.log(value)
    console.log(name)

    this.setState({
      event: {
        ...this.state.event,
        [name]: name === 'cost' || name === 'categoryId' || name === 'ageRestriction' ? parseFloat(value) : value
      }
    });
    console.log(this.state.event);
  };

  componentDidMount = event => {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  };

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      event: {
        ...this.state.event,
        hostId: user && user.sub
      }
    });
    console.log(user);
  }

  render() {
    return (
      <div class="card">
      <div class="submit container-fluid">
        <h1 class="header">Tell Us About Your Event</h1>

        <Location/>

        <form onSubmit={this.handleSubmit}>
        <h3>What is your event?</h3>
          <div class="form-group">
            <label for="inputName">Name:</label>
            <input
              id="inputName"
              class="form-control"
              name="name"
              type="text"
              placeholder="Title"
              value={this.state.event.name}
              onChange={this.handleInputChange}
              required
            />
          </div>

            <div className="form-group">
              <label for="description">Description:</label>
              <textarea
                id="description"
                className="form-control"
                cols="50"
                rows="5"
                description="description"
                name="description"
                minLength="1"
                maxLength="200"
                value={this.state.event.description}
                onChange={this.handleInputChange}
                required
              ></textarea>
            </div>

          <div class="categorySelect">
            <label for="categorySelect">Event category:</label>
            <select
              id="categorySelect"
              value={this.state.event.categoryId}
              class="form-control"
              name="categoryId"
              onChange={this.handleInputChange}
            >
              <option value="1">Music</option>
              <option value="2">Comedy</option>
              <option value="3">Culture</option>
              <option value="4">Festival</option>
            </select>
            </div>

          <div class="form-group">
            <label>Start Time:</label>
            <input 
            type="datetime-local"
            name="eventTime"
            value={this.state.eventTime}
            onChange={this.handleInputChange}
            className="form-control"/>
          </div>
          
          <div class="form-group">
            <label>End Time:</label>
            <input 
            type="datetime-local"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleInputChange}
            className="form-control"/>
          </div>

          <div class="form-group"> 
              <label for="costId">Cost:</label>
              <input 
                type="number" 
                name="cost"
                value={this.state.event.cost}
                min="0.00" step="0.50" 
                data-number-to-fixed="4" 
                data-number-stepfactor="100" 
                class="form-control currency" 
                id="costId" 
                onChange={this.handleInputChange}/>
          </div>

          <div class="image">
            Image: <input id="imageUpload" type="file" />
          </div>

          {["checkbox"].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="18+?"
                value="18"
                type={type}
                name="ageRestriction"
                onChange={this.handleInputChange}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="21+?"
                type={type}
                value="21"
                name="ageRestriction"
                onChange={this.handleInputChange}
                id={`inline-${type}-2`}
              />
            </div>
          ))}

            <button className="btn primaryButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
