import React, {Component} from 'react';
import './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from '../../actions/index.js';

import _ from 'lodash';

import PostBar from './PostBar/PostBar';
import Post from './Post/Post';

class Feed extends Component{
  componentDidMount(){
    this.props.fetchPosts(this.props.user._id);
  }
  renderPosts(){
    return _.map(this.props.posts, post => {
      //console.log(post);
      return(
        <Post key={post._id} post={post} />
      );
    });
  }
  render(){
    return(
      <div className={`${this.props.className} Feed`}>
        <div className='Feed-title'>Garden News</div>
        <PostBar className='Feed-PostBar' user={this.props.user} />
        {this.renderPosts()}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {posts: state.posts, user: state.user};
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);
