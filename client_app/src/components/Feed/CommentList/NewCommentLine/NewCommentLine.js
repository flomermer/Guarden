import React, {Component} from 'react';
import './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from '../../../../actions/index.js';

import axios from 'axios';
import {ROOT_API} from '../../../../consts/consts';

class NewCommentLine extends Component{
  constructor(props){
    super(props);

    this.state = {term: ''}
  }
  sendComment(e){
    e.preventDefault();
    const url = `${ROOT_API}/community/addComment`;
    const user_id = this.props.user._id;
    const post_id = this.props.post._id;
    const content = this.state.term;

    const req = axios.put(url, {user_id, post_id, content});
    req.then((res) => {
      this.props.fetchPosts(this.props.user._id);
      this.setState({term: ''});
    });
  }
  render(){
    return(
      <form className={`${this.props.className} NewCommentLine`} onSubmit={(e) => this.sendComment(e)}>
        <input type='text' placeholder="Comment to post..."
          onChange={(e) => this.setState({term: e.target.value})} value={this.state.term} />
      </form>
    );
  }
}

function mapStateToProps(state){
  return {user: state.user}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentLine);
