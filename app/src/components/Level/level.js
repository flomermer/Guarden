import React, {Component} from 'react';
import {connect} from 'react-redux';

class Level extends Component{
  render(){
    return(
      <div>{this.props.level}</div>
    );
  }
}

function mapStateToProps(state){
  return{
    level: state.user
  };
}

export default connect(mapStateToProps)(Level);
