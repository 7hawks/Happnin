import axios from 'axios';
import React, { Component } from "react";
import "../styles/Marker.css";
import GoogleMapReact from "google-map-react";
import { MapMarker } from "./MapMarker"; 

const Marker = props => {
    return <>
      <div className="pin"></div>
      <div className="pulse"></div>
    </>
}

var myLatLng = { lat:47.491255, lng:-117.582624 };

export class Map extends Component {

    constructor(props) {
        super(props);
        this.testVarible = "this is a test";
        this.state = {
            events: [],
            jsonEvent: [],
            addresses: [],
            loading: true,
            markers: [],
            locations: [],
            latLngs: [],
            geolocations: [],
            locationIds: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.populateLocationData = this.populateLocationData.bind(this);
    }


    static defaultProps = {
        center: {
          lat: 47.491255,
          lng: -117.582624
        },
        zoom: 13,
      };

    renderMarkers(map, maps) {
        let marker = new maps.Marker({
          position: myLatLng,
          map,
          title: 'Default Marker'
        });
    }

    renderInfoWindow(map, maps) {
        let infoWindow = new maps.InfoWindow({
            position: myLatLng,
            map,
            title: 'Default Marker',
            content: "Here is a really cool event!"
        });
    }

    async componentDidMount() {
        this.populateLocationData();
        
        var jsonevent = JSON.stringify(this.props.events);
        console.log(jsonevent);
     
        this.setState({
            markers: [{ lat: 47.495510, lng: -117.575530 }, { lat: 47.4876566, lng: -117.5758604 }, { lat: 47.491255, lng: -117.582624 }]
        });

        this.state.locations.forEach(location => { console.log("comp Location: " + location)});

        var location = '407 1st st Cheney WA'
        axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=122+College+Ave,+Cheney,+WA&key=YOUR_KEY_HERE',{
            params:{
                address:location,
                key:'YOUR_KEY_HERE'
            }
        })
        .then(function(response){
            console.log(response);
            console.log(response.data.results[0].geometry.location.lat);
            console.log(response.data.results[0].geometry.location.lng);
        })
        .catch(function(error){
            console.log(error);
        })    
    }

    render() {

        console.log("render: " + this.props.events);
       
        var eventArray = JSON.parse(this.props.events);
        var locationIds = [];

        eventArray.forEach(element => locationIds.push(element.locationId));

        locationIds.forEach(locationId =>
            console.log("id: " + locationId)
        );

        return (
            <>
                <h2>{this.state.addresses} </h2>
                {this.state && this.state.latLngs &&
                    <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'YOUR_KEY_HERE' }}
                            defaultCenter={this.props.center}
                            defaultZoom={14}
                            /* onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)} */
                            onGoogleApiLoaded={({ map, maps }) => this.renderInfoWindow(map, maps)}
                            yesIWantToUseGoogleMapApiInternals
                        >
                            {  /*      <Marker
                            lat={47.491255}
                            lng={-117.582}
                            text="Custom Marker"
                        /> */}
                            {this.state.markers.map((marker, i) => {
                                return (
                                    <Marker
                                        lat={marker.lat}
                                        lng={marker.lng}
                                    />
                                )
                            })}
                        </GoogleMapReact>
                    </div>
                }
            </>
        );
    }

    async populateLocationData() {
        const response = await fetch("api/Location");
        console.log(response);
        const data = await response.json();
        console.log("Got Location Data", data);
        this.setState({ locations: data, loading: false });


        this.state.locations.forEach(location => {
            var a = JSON.stringify(location.address);
            a = a.replace(/^"|"$/g, '');

            var b = JSON.stringify(location.city)
            b = b.replace(/^"|"$/g, '');

            var c = JSON.stringify(location.state);
            c = c.replace(/^"|"$/g, '');

            this.state.addresses.push(a + " " + b + " " + c)
        });

        this.state.addresses.forEach(eventAddress => {
            console.log("event address: " + eventAddress);

            var self = this;

           const response = axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: eventAddress,
                    key: 'YOUR_KEY_HERE'
                }
            })
                .then(function (response) {
                    console.log(response);
                    console.log(response.data.results[0].geometry.location.lat);
                    console.log(response.data.results[0].geometry.location.lng);

                    var latitude = response.data.results[0].geometry.location.lat;
                    var longitude = response.data.results[0].geometry.location.lng;

                    var latLng = {};
                    latLng["lat"] = latitude;
                    latLng["lng"] = longitude;
                    self.state.latLngs.push(latLng);
                })
                .catch(function (error) {
                    console.log(error);
                })   
            const data = JSON.stringify(response);
            console.log("test response" + response);
        });
    }
}