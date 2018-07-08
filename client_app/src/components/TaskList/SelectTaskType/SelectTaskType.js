import React, {Component} from 'react';
import './style.css';

class SelectTaskType extends Component{
  render(){
    const isSpecial = this.props.isSpecial;
    const selectType = this.props.selectType;
    return(
      <div className={`${this.props.className} SelectTaskType`}>
        <div className={`SelectTaskType-regular ${isSpecial ? '' : 'selected'}`}
          onClick={() => selectType(false)}
        >
          Regular
       </div>
       <div className={`SelectTaskType-special ${!isSpecial ? '' : 'selected'}`}
         onClick={() => selectType(true)}
       >
         Special
      </div>
      </div>
    );
  }
}

export default SelectTaskType;
