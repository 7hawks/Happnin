import React, { Component } from "react";
import "../styles/Marker.css";
import GoogleMapReact from "google-map-react";

const Marker = props => {
    return <>
      <div className="pin"></div>
      <div className="pulse"></div>
    </>
}

var myLatLng = { lat:47.491255, lng:-117.582624 };

export class Map extends Component {

    static defaultProps = {
        center: {
          lat: 47.491255,
          lng: -117.582624
        },
        zoom: 11
      };

    renderMarkers(map, maps) {
        let marker = new maps.Marker({
          position: myLatLng,
          map,
          title: 'Default Marker'
        });
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCinU09kiqBx-4eQbo8a0uUrsGXKQXe36M' }}
                    defaultCenter={this.props.center}
                    defaultZoom={14}
                    onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                    yesIWantToUseGoogleMapApiInternals
                >
                    <Marker
                        lat={47.491255}
                        lng={-117.582}
                        text="Custom Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}