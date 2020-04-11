import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ key, coordinates}) => {
    return (
        <GoogleMapReact>
            bootstrapURLKeys={{ key }}
            defaultCenter={{lat: coordinates[0], lng: coordinates[1]}}
            defaultZoom={15}>
            <Marker lat={coordinates[0]} lng={coordinates[1]} />
        </GoogleMapReact>
    )
}

const Marker = props => {
    return <>
        <div className="pin"></div>
        <div className="pulse"></div>
    </>
}

export { Map, Marker };



