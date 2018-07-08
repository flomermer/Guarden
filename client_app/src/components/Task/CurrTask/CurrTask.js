import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateUser, fetchPosts} from '../../../actions/index.js';

import {Link} from 'react-router-dom';

import axios from 'axios';
import {ROOT_API} from '../../../consts/consts';

class CurrTask extends Component{
  completeTask(task){
    const user = this.props.user;

    const url = `${ROOT_API}/task/complete`;
    const request = axios({
      method: 'post',
      url,
      data: {user_id: user._id}
    });

    request.then((res) => { //api returns {user, newPost}
      let updatedUser = Object.assign({},res.data.user);
      updatedUser.lastTask = task;
      this.props.updateUser(updatedUser);
      this.props.fetchPosts(user._id);
    });
  }

  render(){
    const task = this.props.task;
    return(
      <div className='Task'>
        <div className="Task-title">{task.title}</div>
        <div className="Task-desc">{task.desc}</div>
        <div className='Task-Buttons'>
          <button className="Task-btn active" onClick={() => this.completeTask(task)}>
            Done<br />
            <span className='Task-points'>({task.points} points)</span>
          </button>
          <button className='Task-btn passive'><Link to='/TaskList' className='LinkBtn'>Choose</Link></button>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({updateUser, fetchPosts}, dispatch);
}

export default connect(null,mapDispatchToProps)(CurrTask);
