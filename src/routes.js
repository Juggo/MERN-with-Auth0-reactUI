import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

import Header from './Header';
import AddProvider from './Provider/AddProvider';
import Provider from './Provider/Provider';
import AddReview from './Provider/AddReview';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <BrowserRouter history={history}>
        <div>
          <Header auth={auth} history={history}/>
          <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/provider" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Provider auth={auth} {...props} />
            )
          )} />
          <Route path="/add-provider" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <AddProvider auth={auth} {...props} />
            )
          )} />
          <Route path="/add-review" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <AddReview auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </BrowserRouter>
  );
}
