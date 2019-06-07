import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../home/Home';

export default class Router extends Component {
  render() {
    return (
        <Router>
             <Route exact path="/" component={Home} />
             <Route path="/search" component={Home} />
        </Router>
    )
  }
}
