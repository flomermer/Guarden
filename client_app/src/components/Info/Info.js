import React, {Component} from 'react';
import './style.css';

import Level from '../Level/Level';
import Task from '../Task/Task';
import GoogleLogout from '../GoogleLogout/GoogleLogout';

class Info extends Component{
  render(){
    const user = this.props.user;

    return(
      <div className={`${this.props.className} Info`}>
        <Level className="Info-Level" level={this.props.user.level}/>
        <Task className="Info-Task" user={user} />
        <GoogleLogout />
      </div>
    );
  }
}

export default Info;
