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
        <div className='Info-top-line'>
          <Level className="Info-Level" level={this.props.user.level}/>
          <GoogleLogout className='Info-GoogleLogout' />
        </div>
        <Task className="Info-Task" user={user} />
      </div>
    );
  }
}

export default Info;
