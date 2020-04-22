import React, { Component } from "react";

export class FetchLocationData extends Component {
  static displayName = FetchLocationData.name;

  constructor(props) {
    super(props);
    this.state = { Locations: [], loading: true };
  }

  componentDidMount() {
    this.populateLocationData();
  }

  static renderLocationsTable(Locations) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {Locations.map((l) => (
            <tr key={l.address}>
              <td>{l.address}</td>
              <td>{l.city}</td>
              <td>{l.zipCode}</td>
              <td>{l.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchLocationData.renderLocationsTable(this.state.Locations)
    );

    return (
      <div className="card">
        <h1 id="tableLabel" className="header">
          Locations
        </h1>
        <p>Got these Locations from our server DAWG</p>
        {contents}
      </div>
    );
  }

  async populateLocationData() {
    console.log("in populate data");
    const response = await fetch("/api/Location/");
    console.log("after fetch");
    console.log(response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ Locations: data, loading: false });
  }
}
