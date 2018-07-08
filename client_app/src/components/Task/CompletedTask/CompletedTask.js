import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import {Link} from 'react-router-dom';

class CompletedTask extends Component{
  render(){
    const task = this.props.task;
    return(
      <div className='CompletedTask'>
        <FontAwesomeIcon icon={faTrophy} size="5x" color='#ff8400'/>
        <div className='CompletedTask-title'>
          Amazing!
        </div>
        <div className='CompletedTask-content'>
          <span>{task.title}</span> was completed!
        </div>
        <Link to='/TaskList'><button className='Task-btn passive one'>New Task</button></Link>

      </div>
    );
  }
}

export default CompletedTask;
