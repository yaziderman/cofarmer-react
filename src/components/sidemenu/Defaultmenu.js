import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter } from 'react-router-dom';

class Defaultmenu extends Component {

  constructor(props){
    super(props);
    this.state = {}   
  }

  componentDidMount(){
    let currentPath = this.props.location;
    let construtedPath = currentPath.pathname+currentPath.search;

    let menuList = document.querySelectorAll('.nav-link');
    menuList.forEach((elm)=>{
        if(elm.getAttribute("href") == construtedPath){
            elm.classList.add('active');
        }else{
            elm.classList.remove('active');
        }
    });
  }

  render() {
    
    return (
      <div>
        <ul id="sidebarnav" className="nav nav-pills  nav-stacked list-style-none components">  
            <li>
                <a href="/" className="nav-link"> 
                    <i className="mdi mdi-earth adjusted-icon-font"></i>&nbsp;Processes Report
                    <span className="m-t-0"></span>
                </a> 
            </li> 
            <li>
                <a href="/tractors" className="nav-link"> 
                    <i className="mdi mdi-basket adjusted-icon-font"></i>&nbsp;Tractors
                    <span className="m-t-0"></span>
                </a> 
            </li> 
            <li>
                <a href="/fields" className="nav-link"> 
                    <i className="mdi mdi-basket adjusted-icon-font"></i>&nbsp;Fields
                    <span className="m-t-0"></span>
                </a> 
            </li> 
            <li>
                <a href="/processes" className="nav-link"> 
                    <i className="mdi mdi-basket adjusted-icon-font"></i>&nbsp;Processes
                    <span className="m-t-0"></span>
                </a> 
            </li> 
          </ul>  
      </div>
    )
  }
}
export default withRouter(Defaultmenu);