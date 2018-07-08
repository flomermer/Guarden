import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser} from '../../actions/index.js';

import {Redirect} from 'react-router-dom';
import axios from 'axios';

import {ROOT_API} from '../../consts/consts';

import TaskListItem from './TaskListItem/TaskListItem';

class TaskList extends Component{
  constructor(props){
    super(props);
    this.state = {tasks: [] };

    this.renderTask = this.renderTask.bind(this);
    this.chooseTask = this.chooseTask.bind(this);
  }
  componentDidMount(){
    this.fetchTasks();
  }
  fetchTasks(){
    const url = `${ROOT_API}/task/getTasksList`;
    const user = this.props.user;
    if(!user)
      return <Redirect to='/GoogleLogin' />;

    const request = axios({
      method: 'post',
      url: url,
      data: {user_id: user._id}
    });
    request.then((res) => {
      this.setState({tasks: res.data});
    });
  }
  chooseTask(task){
    const user_id = this.props.user._id;
    const user_level = this.props.user.level;
    const task_id = task._id;

    if(task.level>user_level){
      alert("tomer");
      return false;
    }
    const url = `${ROOT_API}/task/choose`;
    const request = axios({
      method: 'post',
      url,
      data: {user_id, task_id}
    });

    request.then((res) => {
      let updatedUser = Object.assign({},this.props.user);
      updatedUser.selectedTask = task;
      this.props.updateUser(updatedUser);
      this.props.history.push('/');
    });
  }
  renderTask(task){
    return(
      <TaskListItem key={task._id} task={task} chooseTask={this.chooseTask} />
    );
  }
  render(){
    const user = this.props.user;
    if(!user)
      return <Redirect to='/GoogleLogin' />;

    return(
      <div>
        {this.state.tasks.map(this.renderTask)}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {user: state.user}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({updateUser}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
