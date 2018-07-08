import React, {Component} from 'react';
import './style.css';

import axios from 'axios';
import {ROOT_API} from '../../consts/consts';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchTreeUsers} from '../../actions/index.js';

import {Redirect} from 'react-router-dom';

import CommunityList from './CommunityList/CommunityList';

class JoinCommunity extends Component{
  constructor(props){
    super(props);

    this.state = {term: ''}
    this.chooseCommunity = this.chooseCommunity.bind(this);
  }
  chooseCommunity(comm){
    const url = `${ROOT_API}/community/invite`;
    const user_id = this.props.user._id;
    const community_id = comm._id;

    const req = axios({
      method: 'post',
      url,
      data: {user_id, community_id}
    });
    req.then((res) => {
      this.props.fetchUser(user_id);
      this.props.fetchTreeUsers(user_id);
    }).catch((err) => {
      console.log(err);
    });
  }
  render(){
    if (!this.props.user) return <Redirect to='GoogleLogin' />;
    if(this.props.user.community_id) return <Redirect to='/' />;
    return(
      <div className='JoinCommunity'>
        <div className='JoinCommunity-bar'>
          <input type='text' onChange={(e) => this.setState({term: e.target.value})} placeholder='Search your community...'/>
        </div>
        <CommunityList onChoose={this.chooseCommunity} keyword={this.state.term} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user: state.user}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUser, fetchTreeUsers}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(JoinCommunity);
