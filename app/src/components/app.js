import React, { Component } from 'react';
import Level from './Level/level';
import SelectedTask from './SelectedTask/selected_task';

class App extends Component {
  render() {
    return (
      <div>
        <Level />
        <SelectedTask />
      </div>
    );
  }
}

export default App;
