import React, {Component} from 'react';
import './style.css';

import NoTask from './NoTask/NoTask';
import CurrTask from './CurrTask/CurrTask';
import CompletedTask from './CompletedTask/CompletedTask';

class Task extends Component{
  render(){
    const currTask = this.props.user.selectedTask;
    const completedTask = this.props.user.lastTask;
    
    if(currTask)
      return <CurrTask task={currTask} user={this.props.user} />;
    else if(completedTask)
      return <CompletedTask task={completedTask} />;
    else
      return <NoTask />;
  }
}

export default Task;
