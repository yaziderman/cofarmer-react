import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,Switch } from "react-router-dom";
import Companydetails from '../components/companyDetails/Companydetails';
import CompanyClaim from '../components/companyDetails/CompanyClaim';
import Allevents from '../components/eventSummary/Allevents';
import Upcoming from '../components/eventSummary/Upcoming';
import PrivateRouter from "../utils/PrivateRouter";

class Subrouter extends Component {
    
  render() {
    return (
            <div>
                <Switch>
                    <Route path="/company/:entityUri" component={Companydetails}/>                    
                    {/* <Route path="/company/claim/:entityUri" component={CompanyClaim} />                     */}
                </Switch>
            </div>
    )
  }
}

export default  Subrouter;