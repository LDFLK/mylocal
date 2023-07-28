import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {DEFAULT_ENTITY_ID} from 'constants/EntityConstants.js';
import TestMode from 'nonstate/atoms/TestMode.js';
import AdminPage from 'stateful/pages/AdminPage.js';


import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <TestMode />
        <Router>
          <Switch>
            <Route path="/:regionID"component={AdminPage}/>
            <Route>
               <Redirect to={`/${DEFAULT_ENTITY_ID}`} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
