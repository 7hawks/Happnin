import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-time-picker/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import authService from '../api-authorization/AuthorizeService'
import { Redirect } from "react-router-dom";

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
        locationId: 0,
        categoryId: 1,
        hostId: "",
        eventTime: "2020-02-26T05:21:52.102Z",
        endTime: "2020-02-27T05:21:52.102Z",
        cost: 42.0,
        ageRestriction: 500
      },
      location : { 
          address: "",
          city: "",
          state: "",
          country: "US",
          zipCode: ""
      },
      redirectToHome: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
    this.handleInputLocationChange = this.handleInputLocationChange.bind(this);
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
      .then(
        response => {
              console.log(JSON.stringify(response));
              this.setState({redirectToHome: true});
      })
  }

  async handleSubmitLocation(event) {
        event.preventDefault();
        console.log(this.state);
        console.log(JSON.stringify(this.state.location));
        await fetch("api/Location", {
          method: "POST",
          body: JSON.stringify(this.state.location),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response =>{ var responseJSON = JSON.stringify(response);
                             console.log(responseJSON)
                             console.log(response)
                             this.setState({
                               event: {
                                 ...this.state.event,
                                 locationId: response.id
                               }
                             })})
          //.then(error => console.error("error:", error));
          console.log(this.state);

      }

  handleInputLocationChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          location: {
            ...this.state.location,
            [name]: value
          }
        });
        console.log(this.state);
      };


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
    console.log(this.state);
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

  onDataChanged(newData){
    console.log("in onDataChanged")
    this.setState({location : newData}, ()=>{
      console.log('location has been defined');
    })
    console.log(this.state)
  }

  render() {
    const redirectToHomeRef = this.state.redirectToHome;
    console.log(redirectToHomeRef)
    if (redirectToHomeRef === true){
        return <Redirect to="/"/>
    }

    return (
      <div class="card">
      <div class="submit container-fluid">
        <h1 class="header">Tell Us About Your Event</h1>

        <form onSubmit={this.handleSubmitLocation}>
            <div>
                <h3>Where is your event?</h3>
                <div class="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.location.address}
                        onChange={this.handleInputLocationChange}
                        class="form-control">
                    </input>
                </div>
                <div class="form-group">
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={this.state.location.city}
                        onChange={this.handleInputLocationChange}
                        class="form-control">
                    </input>
                </div>
                <div class="form-group">
                    <label for="state">State</label>
                    <select 
                        class="form-control" 
                        id="state" 
                        name="state"
                        value={this.state.value}
                        
                        onChange={this.handleInputLocationChange}
                        ><option value="---">---</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="District of Columbia">District of Columbia</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Guam">Guam</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Virgin Islands">Virgin Islands</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option></select>
                </div>
                <div class="form-group">
                    <label>Zip Code: </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={this.state.location.zipCode}
                        onChange={this.handleInputLocationChange}
                        class="form-control">
                    </input>
                </div>

                <button className="btn primaryButton" type="submit">Submit</button>
            </div>
            </form>

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
