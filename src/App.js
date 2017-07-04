import React, { Component } from 'react';
import './App.css';
import { API_URL } from './constants';
import { Link } from 'react-router-dom';

//import $ from 'jquery';
//import 'materialize-css/js/materialbox'

class App extends Component {
    constructor(props) {
        super(props);
        
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

        let providerNodes = this.state.providers.map(provider => {
            return (
                <div className="card horizontal hoverable" key={ provider._id }>
                    <div className="card-image">
                      <img alt="" src={ provider.img }/>
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <p><b>{ provider.name }</b></p>
                        <p><i className="material-icons card-icon">description</i>
                            { provider.description }
                        </p>
                        <p><i className="material-icons card-icon">location_on</i>
                            { provider.address.street + ', ' + provider.address.city + ', ' }
                            { (provider.address.postalCode ? provider.address.postalCode + ', ' : '') + provider.address.country }
                        </p>
                        <p><i className="material-icons card-icon star-rate">star_rate</i>
                            { provider.rating.toFixed(1) }
                        </p>
                      </div>
                      <div className="card-action">
                        <Link to={'/provider/' + provider._id}>Information</Link>
                        <a href={ provider.website }>Website</a>
                      </div>
                    </div>
                </div>
            );
        });

        return (
          <div className="container">
              {
                !isAuthenticated() && (
                    <div className="center">
                        <br/><br/><br/><br/>
                        
                        <h1 className="red-text lighten-1">Rate IT is an IT service rating app.</h1><br/><br/>
                        <h2>It allows anyone to rate IT service providers over the entire world.</h2>
                        <h2>That includes web application, digital marketing, custom software and any other IT service provider.</h2>
                        
                        <br/><br/><br/>
                        
                        <h1 className="red-text lighten-1">How does it work?</h1>
                        <br/><br/><br/><br/>
                        
                        <div className="row red-text lighten-1 ">
                            <div className="col s4">
                                <i className="large material-icons">input</i>
                            </div>
                            <div className="col s4 center-align">
                                <i className="large material-icons">person</i>
                            </div>
                            <div className="col s4 center-align">
                                <i className="large material-icons">done_all</i>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col s4">
                                <h2>Log in to rate providers</h2>
                            </div>
                            <div className="col s4">
                                <h2>Pick a provider you wish to rate</h2>
                            </div>
                            <div className="col s4">
                                <h2>Start rating!</h2>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                isAuthenticated() && (
                    <div>
                        { providerNodes == false &&
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        }
                        <br/>
                        <Link to={'/add-provider'} className="waves-effect waves-light btn">Add provider</Link>
                        <br/><br/>
                        { providerNodes }
                    </div>
                )
            }

          </div>
        );
    }
}

export default App;
