import React, { Component } from 'react';
import {connect} from 'react-redux';
import GoogleLogin from './GoogleLogin/google_login.js';
import App from './app';

class PreApp extends Component {
  renderApp(){
    return(
      <div>
        <App />
      </div>
    );
  }
  renderGoogleLogin(){
    return(
      <div>
        <GoogleLogin />
      </div>
    );
  }
  render() {
    return this.props.user ? this.renderApp() : this.renderGoogleLogin();
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(PreApp);
