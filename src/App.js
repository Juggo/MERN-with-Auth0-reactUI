import React, { Component } from 'react';
//import { Navbar, Nav, Button } from 'react-bootstrap';
import './App.css';

import { API_URL } from './constants';
import { Link } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
//        this.state = {providers: []};
        
        if(this.props.auth) {
            this.loadSecuredProviders();
        }
    }
  componentWillMount() {
    this.setState({ providers: [] });
  }
  loadSecuredProviders() {
    const { authFetch } = this.props.auth;
    authFetch(`${API_URL}/providers`)
      .then(data => this.setState({ providers: data }))
      .catch(error => this.setState({ providers: error }));
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { providers } = this.state;
    
    let providerNodes = this.state.providers.map(provider => {
        return (
            <div className="card horizontal" key={ provider._id }>
                <div className="card-image">
                  <img alt="" src="https://lorempixel.com/100/190/nature/6"/>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                  <p><b>{ provider.name }</b></p>
                  <p><i className="material-icons card-icon">info_outline</i>{ provider.info }</p>
                  <p><i className="material-icons card-icon">location_on</i>{ provider.address }</p>
                  <p><i className="material-icons card-icon star-rate">star_rate</i>{ provider.rating }</p>
                  </div>
                </div>
            </div>
        )
    })
    
    return (
      <div className="container">
          {
            !isAuthenticated() && (
                <div className="center">
                    <br/><br/><br/><br/><br/><br/>
                    <h4><b>Rate IT is an IT service rating app.</b></h4>
                    <h4>It allows anyone to rate IT service providers over the entire world.</h4>
                    <br/><br/><br/><br/>
                    <h4>How does it work?</h4>
                    <br/><br/><br/><br/>
                    <h4>All you need to do is <Link to={'/login'}>Log In</Link> and start rating!</h4>
                </div>
            )
        }
        {
            isAuthenticated() && (
                <div>
                    <br/>
                    { providerNodes }
                </div>
            )
        }
        
      </div>
    );
  }
}

export default App;
