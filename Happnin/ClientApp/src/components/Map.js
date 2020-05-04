//import axios from 'axios';
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
        this.getLatLngs = this.getLatLngs.bind(this);
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
        this.state.locationIds.forEach(locId => {
            var latLng = {};
            var test = this.state.locations.find(element => element.id == locId);
            console.log("test: " + test.id);

            latLng["lat"] = Number(test.lat);
            latLng["lng"] = Number(test.lng);

            console.log("latLng: " + latLng);
            console.log("MyLatLng: " + myLatLng);
            let infoWindow = new maps.InfoWindow({
                position: latLng,
                map,
                title: 'Default Marker',
                content: "Here it is!"
            });

        })


    }

    getLatLngs() {
        const locIds = this.state.locationIds;
        let markersTemp = [];
        console.log("locIds: " + locIds);
        this.state.locations.forEach(loc => {
            if (locIds.includes(loc.Id)) {
                var latLng = {};
                latLng["lat"] = loc.lat;
                latLng["lng"] = loc.lng;
                markersTemp.push(latLng);
            }
        });

        console.log("markers temp: " + markersTemp);

        this.setState({
            markers: markersTemp
        });
    }

    async componentDidMount() {
        await this.populateLocationData();
        await this.populateEventData();

        const eventArray = this.state.events;
        console.log("eventArray: " + this.state.events);

        eventArray.forEach(element => {
            this.state.locationIds.push(element.locationId);
        });
      //  this.getLatLngs();
        const locIds = this.state.locationIds;
      
        this.state.locations.forEach(loc => {
            console.log("locIds in loop: " + locIds);
            if (locIds.includes(loc.id)) {
                var latLng = {};
                latLng["lat"] = loc.lat;
                latLng["lng"] = loc.lng;
              //  console.log("latLng: " + latLng);

                this.state.markers.push(latLng);
            }
        });

      //  this.setState({
     //       markers: [{ lat: 47.495510, lng: -117.575530 }, { lat: 47.4876566, lng: -117.5758604 }, { lat: 47.491255, lng: -117.582624 }]
      //  });
    }

    render() {

       // console.log("render: " + this.props.events);
       
        return (
            <>
                <h2>{this.state.addresses} </h2>
                {this.state && this.state.latLngs &&
                    <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyA8c9MKSvmazPKKDpMocP1LGp0pWOXZhfg' }}
                            defaultCenter={this.props.center}
                            defaultZoom={14}
                            /* onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)} */
                            onGoogleApiLoaded={({ map, maps }) => this.renderInfoWindow(map, maps)}
                            yesIWantToUseGoogleMapApiInternals
                        >
                            {this.state.markers.map((marker, i) => {
                                return (
                                    <Marker key={i}
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

    async populateEventData() {
        const response = await fetch("api/Event");
       // console.log(response);
        const data = await response.json();
        this.setState({ events: data, loading: false });
    }

    async populateLocationData() {
        const response = await fetch("api/Location");
      //  console.log(response);
        const data = await response.json();
      //  console.log("Got Location Data", data);
        this.setState({ locations: data, loading: false });
    }
}