import React from 'react';
import './style.css';

const CommentItem = ({comm}) => (
  <div className='CommentItem'>
    <div className='CommentItem-profilePic'>
      <img src={comm.author_id.pic} alt='' />
    </div>
    <div className='CommentItem-content-container'>
      <div className='CommentItem-author'>{comm.author_id.fullName}</div>
      <div className='CommentItem-content'>{comm.content}</div>
    </div>
  </div>
);

export default CommentItem;
