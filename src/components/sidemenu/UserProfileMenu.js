import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class UserProfileMenu extends Component {
  render() {
    return (
      <div>
          <div>
          <ul id="sidebarnav" className="nav nav-pills  nav-stacked list-style-none components">
                       <li>
                           <a href="/opportunities" className="nav-link"> 
                           <i className="mdi mdi-trending-up adjusted-icon-font"></i>&nbsp;Opportunities
                                   <span className="m-t-5"></span>
                           </a>
                       </li>
                       <li>
                           <a href="/events" className="nav-link"> 
                           <i className="mdi mdi-calendar adjusted-icon-font"></i>&nbsp;Events
                                   <span className="m-t-5"></span>
                           </a>
                       </li>
                       <li>
                           <a href="/companies" className="nav-link"> 
                           <i className="material-icons adjusted-icon">business</i>&nbsp;Companies
                                   <span className="m-t-5"></span>
                           </a>
                       </li>                       
                       <li>                           
                           <a href="/search/advanced?t=people" className="nav-link">
                                  <i className="fa fa-user adjusted-icon-font"></i>&nbsp;People
                                  <span className="m-t-5"></span>
                           </a>  
                           <hr className="m-t-0 m-b-5"></hr>                         
                       </li>
                       <li>
                           <a href="/search/advanced" className="nav-link"> 
                           <i className="fa fa-search adjusted-icon-font"></i>&nbsp;Advanced Search
                                   <span className="m-t-5"></span>
                           </a>
                       </li>
                     </ul>  
         </div>
        
      </div>
    )
  }
}
