import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import { Map } from "../Map";

export class FetchEventData extends Component {
  static displayName = FetchEventData.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true };
  }

  componentDidMount() {
    this.populateEventData();
  }

  static renderEvents(events) {
    return (
      <div>
        {events.map(eventinfo => (
          <HappninEvent key={eventinfo.id} {...eventinfo} />
        ))}
      </div>
    );
    }

    static renderMapInfo(events) {
        return (
            <div>
                {events.map(eventinfo => (
                    <Map key={eventinfo.id} {...eventinfo} />
                ))}
            </div>
        );
    }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
            FetchEventData.renderEvents(this.state.events) 
     );

    return (
      <div>
        
        <Map events={JSON.stringify(this.state.events)} />

        <h1 id="tableLabel" className="header">
          Events
        </h1>
        <p>Got these events from our server DAWG</p>

        {contents}
      </div>
    );
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log(response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ events: data, loading: false });
  }
}
