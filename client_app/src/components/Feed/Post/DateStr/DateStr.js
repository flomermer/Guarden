import React, {Component} from 'react';

class DateStr extends Component{
    renderDate(){
      const date = new Date(this.props.date);
      const dateStr = `${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()}`;      
      return (<div>{dateStr}</div>);
    }
    render(){
      return(
        <div className='DateStr'>
          {this.renderDate()}
        </div>
      );
    }
}

export default DateStr;
