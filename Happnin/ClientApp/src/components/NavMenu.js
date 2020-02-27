import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container className = 'navbar'>
            <NavbarBrand tag={Link} to="/" className="logo" >H</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="subHeader" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/fetch-location-data">Locations</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/fetch-user-data">Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/user-account">Account</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/user-creation">Sign Up!</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/submit-event">Submit Event</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/browseEvents">Events</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="subHeader" to="/sign-in">Sign in</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
