import React, {Component} from 'react';
import './style.css';

import {connect} from 'react-redux';

import {Timeline} from 'react-event-timeline'
import TreeItem from './TreeItem/TreeItem';

class Tree extends Component{
  renderTreeItems(){
    const user = this.props.user;
    let minLevel, maxLevel;

    if(user.level===1){
      maxLevel = user.level+4;
      minLevel = user.level;
    } else if(user.level===2){
      maxLevel = user.level+3;
      minLevel = user.level-1;
    } else {
      maxLevel = user.level+2;
      minLevel = user.level-2;
    }
    //console.log(this.props.treeUsers);
    var items = [];
    for (var level = maxLevel; level >= minLevel; level--) {
      if(level===user.level){
        let profilePic = (<img src={user.pic} className='TreeItem-myProfilePic' alt=''/>);
        items.push(<TreeItem key={level} level={level} profilePic={profilePic} bgColor='#fff' textColor='#ff8400' />);
      } else { //not user level
        var profilePic = (level in this.props.treeUsers) ? (<img src={this.props.treeUsers[level].pic} className='TreeItem-profilePic' alt=''/>) : (<div className='TreeItem-profilePic' />);
        items.push(<TreeItem key={level} level={level} profilePic={profilePic} bgColor='#ff8400' textColor='#fff' />);
      }
    }
    return items;
  }
  render(){
    if(!this.props.treeUsers)
      return "loading...";

    return(
      <div className={`${this.props.className} Tree`}>
        <Timeline lineStyle={{background: "#aac580", width: 7}}>
          {this.renderTreeItems()}
        </Timeline>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {user: state.user, treeUsers: state.treeUsers};
}

export default connect(mapStateToProps)(Tree);
