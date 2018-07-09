import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../actions/index.js';

class GoogleLogout extends Component{
  logout(){
    const auth2 = window.gapi.auth2.getAuthInstance()
     if (auth2 != null) {
       auth2.signOut().then(
         auth2.disconnect().then(updateUser(this.props.updateUser(null)))
       );
     }
  }

  render(){
    return(
      <div><button onClick={() => this.logout()}>tomer</button></div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(GoogleLogout);
