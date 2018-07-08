import React, {Component} from 'react';
import './style.css';

import Tree from '../Tree/Tree';
import Info from '../Info/Info';

import {connect} from 'react-redux';

class Welcome extends Component{
  render(){
    const user = this.props.user;

    return(
      <div className={`${this.props.className} Welcome`}>
        <Tree className="Welcome-Tree" />
        <Info className="Welcome-Task" user={user}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {user: state.user};
}

export default connect(mapStateToProps)(Welcome);
