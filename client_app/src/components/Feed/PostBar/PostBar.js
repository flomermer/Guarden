import React, {Component} from 'react';
import './style.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addPost} from '../../../actions/index.js';

class PostBar extends Component{
  constructor(props){
    super(props);

    this.state = {term: ''}
  }
  sendPost(e){
    e.preventDefault();
    this.props.addPost(this.state.term, this.props.user._id);
    //console.log(this.props.user);
    this.setState({term: ''});
  }
  render(){
    return(
      <div className={`${this.props.className} PostBar`}>
        <form onSubmit={(e) => this.sendPost(e)}>
          <input type='text' className='inputPost' placeholder="What's on your mind?"
            onChange={(e) => this.setState({term: e.target.value})} value={this.state.term} />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addPost}, dispatch);
}

export default connect(null ,mapDispatchToProps)(PostBar);
