import React, {Component} from 'react';
import './style.css';
import Welcome from '../Welcome/Welcome';
import Feed from '../Feed/Feed';

class Guarden extends Component{
  render(){
    return(
      <div className="Guarden">
        <Welcome className="Guarden-Welcome"/>
        <Feed className='Guarden-Feed' />
      </div>
    );
  }
}

export default Guarden;
