import axios from 'axios';
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
                zipCode: "",
                lat: "",
                lng: ""
            },
            image: {
                file: ""
            },
            redirectToHome: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
        this.handleInputLocationChange = this.handleInputLocationChange.bind(this);
        this.populateLocationData = this.populateLocationData.bind(this);
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
                console.log("handleSubmit response: " + JSON.stringify(response));
                this.setState({redirectToHome: true});
        })
    }

    handleImageUpload() {

    };

    async handleSubmitLocation(event) {
        event.preventDefault();
        event.persist();
        await this.populateLocationData();
     //   console.log("submit address: " + JSON.stringify(this.state.location.address));

        console.log("state" + this.state);
        console.log("json string" + JSON.stringify(this.state.location));
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
                console.log("location id: " + response.id)
                                this.setState({
                                event: {
                                    ...this.state.event,
                                    locationId: response.id
                                }
                                })})
            //.then(error => console.error("error:", error));
        console.log(this.state);
    }


    async populateLocationData() {
        var addressString = this.state.location.address + " " + this.state.location.city + " " + this.state.location.state;
      
        var self = this;
        await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: addressString,
                key: 'AIzaSyA8c9MKSvmazPKKDpMocP1LGp0pWOXZhfg'
            }
        })
            .then(function (response) {
                console.log(response);

                var latitude = JSON.stringify(response.data.results[0].geometry.location.lat);
                var longitude = JSON.stringify(response.data.results[0].geometry.location.lng);
                self.setState({
                    location: {
                        ...self.state.location,
                        lat: latitude,
                        lng: longitude
                    }
                });
                
            })
            .catch(function (error) {
                console.log(error);
            })  
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

    //handleImageUpload = event => {
    //    const [file] = event.target.files;
    //    if (file) {
    //        const reader = new FileReader(); 
    //        const { current } = this.uploadedImage;
    //        current.file = file;
    //        reader.onload = (e) => {
    //            current.src = e.target.result;
    //        }
    //        reader.readAsDataURL(file);
    //    }

    //};

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        console.log("image: " + this.state.image);
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
        console.log(this.state);
    };

    componentDidMount = event => {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
    };

    componentDidUpdate() {
      //  await this.populateLocationData();
    }

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
    console.log("redirectToHomeRef: " + redirectToHomeRef)
    if (redirectToHomeRef === true){
        return <Redirect to="/"/>
    }

    return (
      <div className="card">
      <div className="submit container-fluid">
        <h1 className="header">Tell Us About Your Event</h1>

        <form onSubmit={this.handleSubmitLocation}>
            <div>
                <h3>Where is your event?</h3>
                <div className="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.location.address}
                        onChange={this.handleInputLocationChange}
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={this.state.location.city}
                        onChange={this.handleInputLocationChange}
                        className="form-control">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select 
                        className="form-control" 
                        id="state" 
                        name="state"
                        value={this.state.value}
                        
                        onChange={this.handleInputLocationChange}
                        ><option value="---">---</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="District of Columbia">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="Guam">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="Virgin Islands">Virgin Islands</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option></select>
                </div>
                <div className="form-group">
                    <label>Zip Code: </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={this.state.location.zipCode}
                        onChange={this.handleInputLocationChange}
                        className="form-control">
                    </input>
                </div>

                <button className="btn primaryButton" type="submit">Submit</button>
            </div>
            </form>

        <form onSubmit={this.handleSubmit}>
        <h3>What is your event?</h3>
          <div className="form-group">
            <label htmlFor="inputName">Name:</label>
            <input
              id="inputName"
              className="form-control"
              name="name"
              type="text"
              placeholder="Title"
              value={this.state.event.name}
              onChange={this.handleInputChange}
              required
            />
          </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
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

          <div className="categorySelect">
            <label htmlFor="categorySelect">Event category:</label>
            <select
              id="categorySelect"
              value={this.state.event.categoryId}
              className="form-control"
              name="categoryId"
              onChange={this.handleInputChange}
            >
              <option value="1">Music</option>
              <option value="2">Comedy</option>
              <option value="3">Culture</option>
              <option value="4">Festival</option>
            </select>
            </div>

          <div className="form-group">
            <label>Start Time:</label>
            <input 
            type="datetime-local"
            name="eventTime"
            value={this.state.eventTime}
            onChange={this.handleInputChange}
            className="form-control"/>
          </div>
          
          <div className="form-group">
            <label>End Time:</label>
            <input 
            type="datetime-local"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleInputChange}
            className="form-control"/>
          </div>

          <div className="form-group"> 
              <label htmlFor="costId">Cost:</label>
              <input 
                type="number" 
                name="cost"
                value={this.state.event.cost}
                min="0.00" step="0.50" 
                data-number-to-fixed="4" 
                data-number-stepfactor="100" 
                className="form-control currency" 
                id="costId" 
                onChange={this.handleInputChange}/>
          </div>

          <div className="image">
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

            <div className="App">
                <input type="file" accept="image/*" onChange={this.onImageChange} multiple="false" />
                <div
                    style={{
                        height: "60px",
                        width: "60px",
                        border: "1px dashed black"
                    }}
                >
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute"
                        }}
                    />
                </div>
            </div>
            <img id="target" src={this.state.image} />

            <button className="btn primaryButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
