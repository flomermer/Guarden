import React, {Component} from 'react';
import './style.css';

class Level extends Component{
  constructor(props){
    super(props);
    this.state = {levelUpClass: null};
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.level<nextProps.level){
        this.levelUp();
    }
  }
  levelUp(){
    this.setState({levelUpClass: 'levelUp'});
    setTimeout(() => {
      this.setState({ levelUpClass: null });
    }, 1000);
  }
  render(){
    return(
      <div className={`${this.props.className} ${this.state.levelUpClass} Level`}>
        Level {this.props.level}
      </div>
    );
  }
}

export default Level;
