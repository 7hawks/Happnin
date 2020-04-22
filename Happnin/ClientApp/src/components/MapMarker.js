import React, { Component } from "react";
import "../styles/Marker.css";


export class MapMarker extends Component {

    render() {
        const e = this.props;
        console.log("Markerz" + e.id);

        return (
            
            <div>
                <div className="pin"></div>
                <div className="pulse"></div>
            </div>
        );
    }
}