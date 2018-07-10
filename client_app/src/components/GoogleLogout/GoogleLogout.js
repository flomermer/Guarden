import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../../actions/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class GoogleLogout extends Component{
  logout(){
    const auth2 = window.gapi.auth2.getAuthInstance()
     if (auth2 != null) {
       auth2.signOut().then(
         auth2.disconnect().then(() => {
           this.props.logout();
         })
       );
     }
  }

  render(){
    return(
      <div className={`${this.props.className} GoogleLogout`}>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={()=>this.logout()} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({logout}, dispatch);
}

export default connect(null, mapDispatchToProps)(GoogleLogout);
