import React, {Component} from 'react';
import {connect} from 'react-redux';

class SelectedTask extends Component{
  render(){
    return(
      <div>SelectedTask</div>
    );
  }
}

function mapStateToProps(state){
  return{
    selectedTask: state.selectedTask
  };
}

export default connect(mapStateToProps)(SelectedTask);
