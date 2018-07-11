import React, { Component } from 'react';
import './App.css';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Guarden from './components/Guarden/Guarden';

class App extends Component {
  render() {
    const user = this.props.user;
    if(!user) return <Redirect to='/GoogleLogin' />;
    else if(!user.community_id) return <Redirect to='/JoinCommunity' />;
    else return <Guarden />;
  }
}
function mapStateToProps(state){
  return {user: state.user};
}

export default connect(mapStateToProps)(App);
