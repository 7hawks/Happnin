import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { FetchEventData } from "./components/Event/FetchEventData";
import { FetchUserData } from "./components/User/FetchUserData";
import { FetchLocationData } from "./components/FetchLocationData";
import { SubmitEvent } from "./components/Event/SubmitEvent";
import { BrowseEvents } from "./components/Event/BrowseEvents";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { ContactUs } from "./components/ContactUs";
import "./styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/react_dates_overrides.css";

export default class App extends Component {
  static displayName = App.name;

  state = {
    eventinfoarray: [],
  };

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/submit-event" component={SubmitEvent} />
        <Route path="/BrowseEvents" component={BrowseEvents} />
        <Route path="/fetch-event-data" component={FetchEventData} />
        <Route path="/fetch-user-data" component={FetchUserData} />
        <Route path="/fetch-location-data" component={FetchLocationData} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/about" component={About} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
      </Layout>
    );
  }
}
