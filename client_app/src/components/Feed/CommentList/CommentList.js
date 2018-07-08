import React, {Component} from 'react';
import './style.css';

import CommentItem from './CommentItem/CommentItem';
import NewCommentLine from './NewCommentLine/NewCommentLine';

class CommentList extends Component{
  renderComment(comm){
    //console.log(comm);
    return(
      <CommentItem className='CommunityList-CommunityItem' key={comm._id} comm={comm} />
    );
  }
  render(){
    return(
      <div className={`${this.props.className} CommentList`}>
        {this.props.post.comments.map(this.renderComment)}

        <NewCommentLine className='CommentList-NewCommentLine' post={this.props.post}/>
      </div>
    );
  }
}

export default CommentList;
