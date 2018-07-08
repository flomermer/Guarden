import React, {Component} from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import {ROOT_API} from '../../../../consts/consts';

class Like extends Component{
  constructor(props){
    super(props);

    this.state = {isLike:  this.props.post.isLike}
  }
  toggleLike(){
    const post_id = this.props.post._id;
    const path = this.state.isLike ? 'dislikePost' : 'likePost';
    const url = `${ROOT_API}/community/${path}`;

    const req = axios.put(url, {post_id});

    req.then((res) => {
      const newState = !this.state.isLike;
      this.setState({isLike: newState});
    }).catch((err) => console.log(err));
  }
  render(){
    const heart = this.state.isLike ? solidHeart : emptyHeart;
    return(
      <FontAwesomeIcon icon={heart} onClick={() => this.toggleLike()}/>
    );
  }
}

export default Like;
