import React, {Component} from 'react';
import './style.css';

import Level from '../Level/Level';
import Task from '../Task/Task';

class Info extends Component{
  render(){
    const user = this.props.user;

    return(
      <div className={`${this.props.className} Info`}>
        <Level className="Info-Level" level={this.props.user.level}/>
        <Task className="Info-Task" user={user} />
      </div>
    );
  }
}

export default Info;
