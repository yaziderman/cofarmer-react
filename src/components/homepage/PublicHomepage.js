import React, { Component } from 'react';
import Login from "../auth/Login";
import { login , fetchUserInfo } from '../../actions/authAction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from 'react-router-dom';
import store from '../../store';
import { connect } from 'react-redux';

class PublicHomepage extends Component {

    constructor(props){
        super(props)
        this.state = {
            auth:{},
        }
    
    } 

    componentDidMount(){
        var storeState = store.getState();
        var auth = storeState.auth;
        if(auth.isAuthenticated == true){                   
            let user = auth.user;
            setTimeout(() => {
                this.props.fetchUserInfo(); 
            });
           
        }
            
    }


  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row p-0 parent">
            <div className="col-md-6 p-0 col-sm-12 float-left colomns">                 
                 <div className="homepage-register text-left m-a auth-card auth-res-card">
                    <div className="card-body regCard p-l-0">
                        CoFarmer
                    </div>
                    <Login mode="homepage" registerStyle="homepage"/>
                 </div>
            </div>            
        </div>
       </div>
    )
  }
}

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{login,fetchUserInfo})(withRouter(PublicHomepage));
