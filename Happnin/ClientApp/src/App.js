import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { FetchEventData } from './components/FetchEventData';
import { FetchUserData } from './components/FetchUserData';
import { FetchLocationData } from './components/FetchLocationData';
import { Counter } from './components/Counter';
import { UserAccount } from './components/UserAccount';
import { UserCreation } from './components/UserCreation';
import { SubmitEvent } from './components/SubmitEvent';
import { browseEvents } from './components/browseEvents';
import { signIn } from './components/sign-in';
import { EditAccount } from './components/EditAccount';
import { forgotPassword } from './components/forgotPassword';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './react_dates_overrides.css'


export default class App extends Component {
  static displayName = App.name;

  state = {
    eventinfoarray: []
  };

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/user-account' component={UserAccount} />
        <Route path='/user-creation' component={UserCreation} />
        <Route path='/submit-event' component={SubmitEvent} />
        <Route path='/browseEvents' component={browseEvents} />
        <Route path='/fetch-event-data' component={FetchEventData}/>
        <Route path='/fetch-user-data' component={FetchUserData}/>
        <Route path='/fetch-location-data' component={FetchLocationData}/>
        <Route path='/sign-in' component={signIn}/>
        <Route path='/forgotPassword' component={forgotPassword} />
        <Route path='/edit-account' component={EditAccount} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
