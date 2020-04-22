import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { LoginMenu } from "./api-authorization/LoginMenu";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/NavMenu.css";
import logo from "../images/happninHLogoCircle.png";
export class NavMenu extends Component {
  
    static displayName = NavMenu.name;
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true,
          loading: true,
          weather:null,
          city_name:null,
          latitude:null,
          longitude:null
        };
        /*this.getLocation = this.getLocation.bind(this);
        this.getCordinates = this.getCordinates.bind(this);
        this.getLocation();*/
    }
   /* getLocation() {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getCordinates);
      }
    }
    getCordinates(position){
      console.log(position.coords.latitude);
      this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
    }*/
    async componentDidMount() {
      const url = " https://api.openweathermap.org/data/2.5/weather?q=Spokane&appid=c8f563efec9edd5b35f0b4324f97df52&units=imperial";
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      this.setState({ weather: data.main, city_name : data.name, loading: false})
    }

    toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    }

  render() {
    return (
      <header className="container-fluid rounded shadow-sm">
        <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-5" light>
          <Container className="navbar">
            <NavbarBrand tag={Link} to="/" className="logo">
              <img
                id="logo"
                className="d-inline-block mr-1"
                alt="Logo"
                src={logo}
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="navHeader"
                    to="/fetch-location-data"
                  >
                    Locations
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="navHeader"
                    to="/fetch-user-data"
                  >
                    Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/submit-event">
                    Submit Event
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/BrowseEvents">
                    Events
                  </NavLink>
                </NavItem>
                <LoginMenu></LoginMenu>
                  <div>
                    {this.state.loading || !this.state.weather ?(
                        <div>loading weather</div>
                      ):(
                        <div>the weather in {this.state.city_name} is {this.state.weather.temp} degrees</div>
                      )}
                  </div>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
