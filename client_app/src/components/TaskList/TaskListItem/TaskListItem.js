import React from 'react';
import './style.css';

const TaskListItem = ({task,chooseTask}) => (
  <div className='TaskListItem' onClick={()=>chooseTask(task)}>
    {task.title} - {task.desc} - {task.points} - <b>${task.level}</b>
  </div>
);
export default TaskListItem;
