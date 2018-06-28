import React, {Component} from 'react';
import {updateUser} from '../../actions/index';
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
        <button onClick={() => this.props.updateUser()}>Login</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  console.log("SA");
  return bindActionCreators({updateUser: updateUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(GoogleLogin);
