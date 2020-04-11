import React, { Component } from "react";

export class FetchUserData extends Component {
  static displayName = FetchUserData.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.populateUsersData();
  }

  static renderUsersTable(users) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>User Name</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Location Id</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.userName}>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.locationId}</td>
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
      FetchUserData.renderUsersTable(this.state.users)
    );

    return (
      <div className="card">
        <h1 id="tableLabel" className="header">
          Users
        </h1>
        <p>Got these users from our server DAWG</p>
        {contents}
      </div>
    );
  }

  async populateUsersData() {
    console.log("before fetch");
    const response = await fetch("api/User");
    console.log(response);
    console.log("after fetch");
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ users: data, loading: false });
  }
}
