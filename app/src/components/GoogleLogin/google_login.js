import React, {Component} from 'react';
import {fetchUser} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class GoogleLogin extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        GoogleLogin
        <button onClick={() => this.props.fetchUser()}>Login</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(GoogleLogin);
