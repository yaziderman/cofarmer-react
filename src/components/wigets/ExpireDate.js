import React, { Component } from 'react';
import Helper from "../../shared/custom";
import config from "../../shared/config";
import { connect } from 'react-redux';
import store from '../../store';
import { login } from '../../actions/authAction';
import { withRouter ,Link} from 'react-router-dom';

class ExpireDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            createdDate : undefined,
            expireDate : undefined,
            loggedIn:false,
            localAuth:false,
            enableSubscribe:false,
        }

       this.setExpireDate = this.setExpireDate.bind(this);
       store.subscribe(()=>{
           var storeState = store.getState();  
           let localAuth = this.state.loggedIn;
           let storeAuth = storeState.auth.isAuthenticated;
            if(!this.state.enableSubscribe){
                return;
            }
            if(this.state.localAuth.toString() != storeAuth.toString()){
                this.setState({
                    loggedIn:storeAuth
                },()=>{
                    this.setExpireDate(this.state.loggedIn)
                })
            }
       })
    }


    componentDidMount(){
        setTimeout(()=>{
            var storeState = store.getState();  
            let loggedIn = storeState.auth.isAuthenticated;
            this.setState({
                loggedIn:loggedIn,
                enableSubscribe:true
            })
            this.setExpireDate(loggedIn)
        },1000)
    }



    setExpireDate(loggedIn){
        var storeState = store.getState(); 
        if(loggedIn){
            let createdDate =  storeState.auth.user ? new Date(storeState.auth.user.dateOfRegistration) : undefined;
            this.setState({
                createdDate:createdDate,
                loggedIn:true,
            },()=>{
                let expireDate = createdDate.setMonth(createdDate.getMonth() + 3);
                expireDate = new Date(expireDate)
                this.setState({
                    expireDate:Helper.getDateInDisplayFormat(expireDate),
                    loggedIn:true,
                })  
            })
        }
    }
  render() {
    
    let loggedIn = this.state.loggedIn;
    let expireDate = this.state.expireDate;
    if(!loggedIn){
      return(<div></div>)
    }
   
    return (
      <div>
        <div className="card">
          <div className="card-body  yellow-bg-dark">
            <i className="mdi mdi-calendar biggerIcon"></i>
            <h6 className="font-16 font-normal l-h-15 m-t-10">Your 3 month free trial version ends on:</h6>
            <div className="font-16 text-default font-bold text-black">{expireDate}</div>
          </div>
          <hr className="whiteHr"/>
          <div className="card-body yellow-bg-dark">
            {/* <h6 className="font-16 font-normal">You have <span className="font-bold">18</span> pages left to view this month:</h6> */}
            <Link to="/subscribe" className="btn btn-white text-black font-16">Upgrade Your Package</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
    auth:state.auth.isAuthenticated,
    errors:state.errors
});

export default connect(mapStateToProps,{login})(withRouter(ExpireDate));
