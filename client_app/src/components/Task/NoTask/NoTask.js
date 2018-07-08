import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class NoTask extends Component{
  render(){
    return(
      <div className='Task'>
        <div className="Task-title">Welcome to Guarden</div>
        <div className="Task-desc">Havent your assigned a task yet? please choose a task and keep level up :)</div>
        <Link to='/TaskList'><button className='Task-btn passive one'>Choose Task</button></Link>
      </div>
    );
  }
}

export default NoTask;
