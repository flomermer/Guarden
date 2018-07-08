import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import App from './App.js';
import GoogleLogin from './components/GoogleLogin/GoogleLogin';
import TaskList from './components/TaskList/TaskList';
import JoinCommunity from './components/JoinCommunity/JoinCommunity';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/GoogleLogin" component={GoogleLogin}></Route>
          <Route exact path="/JoinCommunity" component={JoinCommunity}></Route>
          <Route exact path="/TaskList" component={TaskList}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
