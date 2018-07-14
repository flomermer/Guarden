import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import Like from './Like/Like';
import DateStr from './DateStr/DateStr';
import CommentList from '../CommentList/CommentList';

import './style.css';

class Post extends Component{
  constructor(props){
    super(props);

    this.state = {isComments: false};
  }
  toggleComments(){
    const newState = !this.state.isComments;
    this.setState({isComments: newState});
  }
  render(){
    const post = this.props.post;
    const author = this.props.post.author_id;
    return(
      <div className={`${this.props.className} Post`}>
        <div className='Post-title-container'>
          <div className='Post-profile-pic'><img src={author.pic} alt='' /></div>
          <div className='Post-author'>
            <div>
              {author.fullName}
              <span className='Post-author-level'>Level {author.level}</span>
            </div>
            <div className='Post-time'><DateStr date={post.date} /></div>
          </div>
          <div className='Post-like'><Like post={post} /></div>
        </div>
        <div className='Post-content-container'>
          <div className='Post-content'>
            {post.content}
          </div>
          <div className='Post-comment' onClick={() => this.toggleComments()} >
            <span>{post.comments.length}</span>
            <FontAwesomeIcon icon={faComment} />
          </div>
          {this.state.isComments ? <CommentList className='Post-CommentList' post={post} /> : null}
        </div>
      </div>
    );
  }
}

export default Post;
