import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in!
              </h4>
            )
        }
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
      </div>
    );
  }
}

export default Home;
