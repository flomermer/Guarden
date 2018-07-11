import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './App.js';
import GoogleLogin from './components/GoogleLogin/GoogleLogin';
import TaskList from './components/TaskList/TaskList';
import JoinCommunity from './components/JoinCommunity/JoinCommunity';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/GoogleLogin" component={GoogleLogin}></Route>
            <Route path="/JoinCommunity" component={JoinCommunity}></Route>
            <Route path="/TaskList" component={TaskList}></Route>
            <Route path="/" component={App}></Route>
        </Switch>        
      </BrowserRouter>
    );
  }
}

export default Router;
