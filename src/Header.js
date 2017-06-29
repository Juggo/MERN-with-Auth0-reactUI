import React, { Component } from 'react';
//import { Navbar, Nav, Button } from 'react-bootstrap';
import './App.css';

class Header extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
        <nav>
            <div className="container nav-wrapper">
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <a href="" onClick={this.goTo.bind(this, '')} className="brand-logo"><i className="material-icons">done_all</i> Rate IT</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        !isAuthenticated() && (
                            <li><a onClick={this.login.bind(this)}>Log In</a></li>
                        )
                    }
                    {
                        isAuthenticated() && (
                            <li><a onClick={this.logout.bind(this)}>Log Out</a></li>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
  }
}

export default Header;
