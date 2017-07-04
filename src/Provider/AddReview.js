import React, { Component } from 'react';
import { API_URL } from './../constants';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import history from '../history';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providerRating: {
                communication: '',
                management: '',
                integrity: '',
                reliability: '',
                availability: ''
            },
            serviceType: '',
            serviceRating: {
                timeliness: '',
                quality: '',
                costs: ''
            },
            comment: '',
            satisfaction: ''
        };
        //binding all our functions to this class
        this.handleCommunicationChange = this.handleCommunicationChange.bind(this);
        this.handleManagementChange = this.handleManagementChange.bind(this);
        this.handleIntegrityChange = this.handleIntegrityChange.bind(this);
        this.handleReliabilityChange = this.handleReliabilityChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
        this.handleServiceTypeChange = this.handleServiceTypeChange.bind(this);
        this.handleTimelinessChange = this.handleTimelinessChange.bind(this);
        this.handleQualityChange = this.handleQualityChange.bind(this);
        this.handleCostsChange = this.handleCostsChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSatisfactionChange = this.handleSatisfactionChange.bind(this);
    }
    componentDidMount() {
        $(document).ready(function() {
            $('textarea#comment').characterCounter();
        });
    }
    componentWillMount() {
        this.setState({ profile: {} });
        
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });;
        }
    }
    saveReview(e) {
        if(this.state.serviceType !== '' && this.state.comment !== '' && this.state.comment.length <= 500 &&
            this.state.communication > 0 && this.state.management > 0 && this.state.integrity > 0 && 
            this.state.reliability > 0 && this.state.availability > 0 && this.state.timeliness > 0 && 
            this.state.quality > 0 && this.state.costs > 0 && this.state.satisfaction > 0 && 
            this.state.communication < 11 && this.state.management < 11 && this.state.integrity < 11 && 
            this.state.reliability < 11 && this.state.availability < 11 && this.state.timeliness < 11 && 
            this.state.quality < 11 && this.state.costs < 11 && this.state.satisfaction < 11) {
            
            //prevent the form submitting 
            e.preventDefault();
        
            const { authFetch } = this.props.auth;
            authFetch(`${API_URL}` + this.props.location.pathname.replace("/add-review", "/reviews"), {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.state.profile.sub,
                    provider_id: this.props.location.pathname.replace("/add-review/", ""),
                    providerRating: {
                        communication: this.state.communication,
                        management: this.state.management,
                        integrity: this.state.integrity,
                        reliability: this.state.reliability,
                        availability: this.state.availability
                    },
                    serviceType: this.state.serviceType,
                    serviceRating: {
                        timeliness: this.state.timeliness,
                        quality: this.state.quality,
                        costs: this.state.costs
                    },
                    comment: this.state.comment,
                    satisfaction: this.state.satisfaction
                })
            })
              .then(reviewData => {
                    this.setState({ review: reviewData });
                    
                    authFetch(`${API_URL}` + this.props.location.pathname.replace("/add-review", "/reviews-aggregate"))
                        .then(reviewsData => { 
                            this.setState({ reviews: reviewsData });
                            
                            authFetch(`${API_URL}` + this.props.location.pathname.replace("/add-review", "/provider"), {
                                method: "PUT",
                                body: JSON.stringify({
                                    rating: reviewsData[0].totalAverage
                                })
                            }).then(data => {
                                this.setState({ providers: data });
                                history.replace(this.props.location.pathname.replace("/add-review", "/provider"));
                            }).catch(error => this.setState({ reviews: error }));
                        })
                        .catch(error => this.setState({ provider: error }));
              })
              .catch(error => this.setState({ reviews: error }));
        }
    }
    handleCommunicationChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ communication: e.target.value });
        else if (e.target.value === '')
            this.setState({ communication: '' });
        else if (e.target.value < 1)
            this.setState({ communication: 1 });
    }
    handleManagementChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ management: e.target.value });
        else if (e.target.value === '')
            this.setState({ management: '' });
        else if (e.target.value < 1)
            this.setState({ management: 1 });
    }
    handleIntegrityChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ integrity: e.target.value });
        else if (e.target.value === '')
            this.setState({ integrity: '' });
        else if (e.target.value < 1)
            this.setState({ integrity: 1 });
    }
    handleReliabilityChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ reliability: e.target.value });
        else if (e.target.value === '')
            this.setState({ reliability: '' });
        else if (e.target.value < 1)
            this.setState({ reliability: 1 });
    }
    handleAvailabilityChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ availability: e.target.value });
        else if (e.target.value === '')
            this.setState({ availability: '' });
        else if (e.target.value < 1)
            this.setState({ availability: 1 });
    }
    handleServiceTypeChange(e) {
        this.setState({ serviceType: e.target.value });
    }
    handleTimelinessChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ timeliness: e.target.value });
        else if (e.target.value === '')
            this.setState({ timeliness: '' });
        else if (e.target.value < 1)
            this.setState({ timeliness: 1 });
    }
    handleQualityChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ quality: e.target.value });
        else if (e.target.value === '')
            this.setState({ quality: '' });
        else if (e.target.value < 1)
            this.setState({ quality: 1 });
    }
    handleCostsChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ costs: e.target.value });
        else if (e.target.value === '')
            this.setState({ costs: '' });
        else if (e.target.value < 1)
            this.setState({ costs: 1 });
    }
    handleCommentChange(e) {
        this.setState({ comment: e.target.value });
    }
    handleSatisfactionChange(e) {
        if (e.target.value > 0 && e.target.value < 11)
            this.setState({ satisfaction: e.target.value });
        else if (e.target.value === '')
            this.setState({ satisfaction: '' });
        else if (e.target.value < 1)
            this.setState({ satisfaction: 1 });
    }
    render() {
        const isEnabled = 
            this.state.serviceType !== '' && this.state.comment !== '' && this.state.comment.length <= 500 &&
            this.state.communication > 0 && this.state.management > 0 && this.state.integrity > 0 && 
            this.state.reliability > 0 && this.state.availability > 0 && this.state.timeliness > 0 && 
            this.state.quality > 0 && this.state.costs > 0 && this.state.satisfaction > 0 && 
            this.state.communication < 11 && this.state.management < 11 && this.state.integrity < 11 && 
            this.state.reliability < 11 && this.state.availability < 11 && this.state.timeliness < 11 && 
            this.state.quality < 11 && this.state.costs < 11 && this.state.satisfaction < 11;
  
      return (
        <div className="container">
          <br/>
          <div className="nav-wrapper nav-breadcrumbs white">
            <div className="col s12">
              <Link to={'/'} className="breadcrumb teal-text lighten-2">Home</Link>
              <Link to={ this.props.location.pathname.replace("/add-review", "/provider") } className="breadcrumb teal-text lighten-2">Provider Info</Link>
              <Link to={ this.props.location.pathname } className="breadcrumb teal-text lighten-2"><b>Add Review</b></Link>
            </div>
          </div>

          <h1>Add Review</h1>

          <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="serviceType" type="text" required="true" aria-required="true" className="validate" 
                        value={ this.state.serviceType } onChange={ this.handleServiceTypeChange }/>
                    <label htmlFor="serviceType">Type of service <span className="red-text">*</span></label>
                  </div>
                </div>
                
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="comment" data-length="500" required="true" aria-required="true" 
                        value={ this.state.comment } onChange={ this.handleCommentChange } className="materialize-textarea"></textarea>
                    <label htmlFor="comment">Comment <span className="red-text">*</span></label>
                  </div>
                </div>
                
                <h2>Provider Rating</h2>
                
                <div className="row">
                  <div className="input-field col s2 offset-s1">
                    <input id="communication" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.communication } onChange={ this.handleCommunicationChange }/>
                    <label htmlFor="communication">Communication <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s2">
                    <input id="management" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.management } onChange={ this.handleManagementChange }/>
                    <label htmlFor="management">Management <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s2">
                    <input id="integrity" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.integrity } onChange={ this.handleIntegrityChange }/>
                    <label htmlFor="integrity">Integrity <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s2">
                    <input id="reliability" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.reliability } onChange={ this.handleReliabilityChange }/>
                    <label htmlFor="reliability">Reliability <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s2">
                    <input id="availability" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.availability } onChange={ this.handleAvailabilityChange }/>
                    <label htmlFor="availability">Availability <span className="red-text">*</span></label>
                  </div>
                </div>
                
                <br/>
                <h2>Service Rating</h2>
                
                <div className="row">
                  <div className="input-field col s4">
                    <input id="timeliness" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.timeliness } onChange={ this.handleTimelinessChange }/>
                    <label htmlFor="timeliness">Timeliness <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s4">
                    <input id="quality" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.quality } onChange={ this.handleQualityChange }/>
                    <label htmlFor="quality">Quality <span className="red-text">*</span></label>
                  </div>
                  <div className="input-field col s4">
                    <input id="costs" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.costs } onChange={ this.handleCostsChange }/>
                    <label htmlFor="costs">Costs <span className="red-text">*</span> <span className="black-text">*</span></label>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col s12 informative-font-size">
                  <p><span className="black-text">*</span> higher value represents higher satisfaction with costs</p>
                  </div>
                </div>
                
                <br/>
                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <input id="satisfaction" type="number" required="true" aria-required="true" className="validate" 
                        value={ this.state.satisfaction } onChange={ this.handleSatisfactionChange }/>
                    <label htmlFor="satisfaction">Satisfaction <span className="red-text">*</span></label>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col s12 informative-font-size">
                  <p><span className="red-text">*</span> required field</p>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button type="submit" onClick={ this.saveReview.bind(this) } disabled={ !isEnabled } className="waves-effect waves-light btn">Submit</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      );
    }
}

export default AddReview;