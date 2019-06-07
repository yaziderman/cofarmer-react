import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import PrivateRouter from "../utils/PrivateRouter";
import Loginpage from "../components/auth/Loginpage";

import Tractors from '../components/Tractors/Tractors';
import AddEditTractor from '../components/Tractors/AddEditTractor';

import Fields from '../components/Fields/Fields';
import AddEditField from '../components/Fields/AddEditField';

import Processes from '../components/Processes/Processes';
import AddEditProcess from '../components/Processes/AddEditProcess';

import Report from '../components/Reports/Report';

const routes = [
  {
    path: "/login",
    exact: true,
    component: Loginpage
  }
];

const privateRoutes = [   
  {
    path: "/",
    exact: true,
    component: Report
  },
  {
    path: "/tractors",
    exact: true,
    component: Tractors
  },
  {
    path: "/tractor/new",
    exact: true,
    component: AddEditTractor
  },
  {
    path: "/tractor/:id",
    exact: true,
    component: AddEditTractor
  },
  {
    path: "/fields",
    exact: true,
    component: Fields
  },
  {
    path: "/field/new",
    exact: true,
    component: AddEditField
  },
  {
    path: "/field/:id",
    exact: true,
    component: AddEditField
  },
  {
    path: "/processes",
    exact: true,
    component: Processes
  },
  {
    path: "/process/new",
    exact: true,
    component: AddEditProcess
  },
  {
    path: "/process/:id",
    exact: true,
    component: AddEditProcess
  }
];

class Approuter extends Component {
 
  render() {
    return (
      <div className="m-t-80">
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component = {route.component}
          />
        ))}

        <Switch>
          {privateRoutes.map((route, index) => (
            <PrivateRouter
              key={index + "private"}
              path={route.path}
              exact={route.exact}
              component = {route.component}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(Approuter));
