import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/index.js';

import GoogleLogin from './GoogleLogin/google_login.js';
import App from './app';

class PreApp extends Component {
  constructor(props){
    super(props);

    this.props.fetchUser('5b2a680d134ce03c9cdfb2e2'); ////5b2a92f37b32aa000409be13  , 5b2a680d134ce03c9cdfb2e2
  }
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
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUser}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(PreApp);
