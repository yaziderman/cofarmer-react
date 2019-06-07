import React, { Component } from 'react';
import config from '../../shared/config';
import Login from '../auth/Login';
import store from '../../store';
import { connect } from 'react-redux';
import { globalSearch } from '../../actions/searchAction';
import { withRouter, Redirect } from 'react-router-dom';

import { LoadingOverlay, Loader } from 'react-overlay-loader';

class Navbar extends Component {

    constructor(props){
        super(props);        
        this.state = {
            userImage:"",
            isAuthenticated:false,
            searchCriteriaInStore:{},
            loading:false,
            currentPath:"",
            loggedInUserName:""
        }

        const unsubscribe = store.subscribe(() => {
            var storeState = store.getState();
            var newState = {};
            var stateUpdateRequired = false;
            if(this.state.userImage != storeState.auth.user.image){           
                stateUpdateRequired = true;
                newState.userImage = storeState.auth.user.image;
            }  

            if(this.state.isAuthenticated != storeState.auth.isAuthenticated){
                stateUpdateRequired = true;
                newState.loggedInUser = storeState.auth.isAuthenticated;
                newState.loggedInUserName = storeState.auth.token.data.name;
            }  
            if(stateUpdateRequired){
                this.setState(newState);
            }
        }); 
        
    } 

    componentDidMount(){
        let currentPath = this.props.location;
        let construtedPath = currentPath.pathname+currentPath.search;

        var storeState = store.getState();
        this.setState({
            loggedInUser:storeState.auth.isAuthenticated,
            userImage:storeState.auth.user.image,
            loggedInUserName : storeState.auth && storeState.auth.token && storeState.auth.token.data.name
        });
    }

    componentWillReceiveProps(){
        let currentPath = this.props.location;
        let construtedPath = currentPath.pathname+currentPath.search;
    
        setTimeout(() => {
            let menuList = document.querySelectorAll('.nav-link');
            menuList.forEach((elm)=>{
                if(elm.getAttribute("href") == construtedPath){
                    elm.classList.add('activeLink');
                }else{
                    elm.classList.remove('activeLink');
                }
            });
        });
    }
    

    componentWillMount(){
    this.props.history.listen(location => {
        if (location.pathname !== this.props.location.pathname) {
            this.props.location.pathname = location.pathname;
            this.setState({currentPath:this.props.location.pathname});
        }
        });
    }

  render() {
    let currentPath = this.state.currentPath?this.state.currentPath:window.location.pathname;
    let loggedInUser = this.state.loggedInUser;
    let loggedInUserName = this.state.loggedInUserName;
    
    let loading = this.state.loading; 
    console.log("loggedInUser",loggedInUser);
    
    return (
      <div>
         <LoadingOverlay>
             <Loader fullPage loading={loading}/>
        </LoadingOverlay>
        <header className="topbar">
            <nav className="navbar top-navbar navbar-expand-md navbar-light fixed-top">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">
                      <span>
                        CoFarmer
                      </span> 
                    </a>
                </div>
                <div className={(currentPath == "/" && !loggedInUser) ?  "navbar-collapse signInNav" : "navbar-collapse" }>
                    <ul className="navbar-nav  mr-auto mt-md-0">                        
                        <li>           
                        </li>          
                    </ul>                    
                    
                    <ul className="navbar-nav mr-auto mt-md-0 navUl m-r-0-i">
                       <li className="nav-item dropdown">
                             {!loggedInUser ? 
                                <a className="btn btn-info dropdown-toggle text-muted waves-effect waves-dark loginDropdown text-white" id="loginDropdown" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sign In</a>
                                :
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark loginDropdown" id="loginDropdown" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{loggedInUserName}</a>
                            }
                            <Login/>
                        </li>
                    </ul>

                </div>               
            </nav>
        </header>
      </div>
    )
  }
}

//export default Navbar;
export default connect(null,{globalSearch})(withRouter(Navbar));
