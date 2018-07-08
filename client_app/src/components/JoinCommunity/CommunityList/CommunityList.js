import React, {Component} from 'react';
import './style.css';

import axios from 'axios';
import {ROOT_API} from '../../../consts/consts';

import CommunityItem from './CommunityItem/CommunityItem';

class CommunityList extends Component{
  constructor(props){
    super(props);

    this.state = {comms: []};
    this.fetchCommunities = this.fetchCommunities.bind(this);
    this.renderComm = this.renderComm.bind(this);
  }
  componentDidMount(){
    this.fetchCommunities();
  }
  fetchCommunities(){
    const url = `${ROOT_API}/community/getAll`;
    const req = axios.get(url);
    req.then((res) => {
      this.setState({comms: res.data});
    }).catch((err) => {
      console.log(err);
    });
  }
  renderComm(comm){
    if(comm.name.includes(this.props.keyword))
      return (<CommunityItem key={comm._id} comm={comm} onChoose={this.props.onChoose} />);
  }
  render(){
    return(
      <div className={`${this.props.className} CommunityList`}>
        {this.state.comms.map(this.renderComm)}
      </div>
    );
  }
}

export default CommunityList;
