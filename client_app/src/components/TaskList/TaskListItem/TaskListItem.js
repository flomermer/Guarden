import React, {Component} from 'react';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

class TaskListItem extends Component{  
  getDifferenceDate(task){
    var expireDate = new Date(task.expireDate);
    var now = new Date();
    var diffMs = (expireDate - now); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    const resStr = `${diffDays} days, ${diffHrs} hours, ${diffMins} mins`;
    return resStr;
  }
  render(){
    const task = this.props.task;
    const chooseTask = this.props.chooseTask;
    const isLocked = this.props.isLocked;

    const timerStr = task.expireDate ? this.getDifferenceDate(task) : null;

    return(
      <div className={`TaskListItem ${isLocked}`}
        onClick={()=>chooseTask(task)}>
          <div className='TaskListItem-left'>
            <div className='TaskListItem-title'>{task.title}</div>
            <div className='TaskListItem-desc'>{task.desc}</div>
            <div className='TaskListItem-expireDate'>
              {timerStr ? <FontAwesomeIcon icon={faLock} /> : ''}
              {timerStr}
            </div>
          </div>
          <div className='TaskListItem-right'>
            <div className='TaskListItem-points'>+{task.points} pts</div>
            <div className='TaskListItem-level'>Level {task.level}</div>
          </div>
      </div>
    );
  }
}
export default TaskListItem;
