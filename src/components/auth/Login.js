import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import config from '../../shared/config';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import { fetchUserInfo } from '../../actions/authAction';
import { logoutUser } from '../../actions/authAction';
import store from '../../store';
import storeAuth from '../../utils/storeAuth';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import Helpers from '../../shared/custom';


var watchTimeout = undefined;
class Login extends Component {
    constructor(props,context){
        super(props);

        this.state = {
            auth:{},
            email:"",
            password:"",     
            loading:false,
            greeted:false,
        }
       
        this.validateForm    = this.validateForm.bind(this);       
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.watchTimeout = this.watchTimeout.bind(this);
     

        store.subscribe(() => {
            var storeState = store.getState();
            var auth = storeState.auth;
            var localAuth = this.state.auth;
            var fromRegister = storeState.registerData.fromRegister;
            if(fromRegister){
                this.props.history.push('/welcome');
            }
                        
            if(JSON.stringify(auth) != JSON.stringify(localAuth)){ 
                storeAuth(); 
                this.setState({auth:storeState.auth});
                
                if(auth.isAuthenticated == true){                   
                    if(localAuth.isAuthenticated == false){                    
                        this.props.fetchUserInfo(); 
                        this.setState({
                            loading:false,
                            greeted: auth.restored ? true: false,
                        })   
                    }else{
                        let user = auth.user;
                        if(user.fullName && !this.state.greeted){                            
                            //Helpers.pushSuccess("Welcome "+user.fullName+".");
                        }
                        this.setState({
                            greeted:true,
                        })
                    }                   
                }else{
                    
                }                  
            }
            if(storeState.errors){
                this.setState({
                    loading:storeState.errors.loading
                })   
            }
            
        }); 
    }

    watchTimeout(){
        if(watchTimeout){
            clearTimeout(watchTimeout);
        }
        watchTimeout = setTimeout(
            function() {
                this.props.fetchUserInfo();
            }
            .bind(this),
            config.sesstionCheck
        );
    }

    componentDidMount(){

        var storeState = store.getState();
        this.setState({auth:storeState.auth});       
    }
    
    validateForm(event){
        event.preventDefault();        
        const email = this.state.email;
        const password = this.state.password;  
        
        if( email == "" || password == ""){
            Helpers.pushError("Please fill all required fields")
            return false;
        }
        const data = {email:email,password:password}
        this.setState({
            loading:true
        })   
        this.props.login(data,this.props.history);
        event.preventDefault();
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }

    logout(event){
        this.props.logoutUser();
        window.location.reload();
    }
  

     
  render() {
    const auth = this.state.auth;
    const user = auth.user;
    const loggedIn = auth.isAuthenticated;
    let loading = this.state.loading;
    return (
            <div className="dropdown-menu dropdown-menu-right scale-up">
                 <LoadingOverlay>
                    <Loader fullPage loading={loading}/>
                </LoadingOverlay>
                {
                    loggedIn ? 
                    <div>
                        <ul className="dropdown-user loggedIn" >
                            <li><button onClick={this.logout} className="col-md-12 point"><i className="fa fa-power-off"></i> Logout</button></li>

                        </ul>
                     </div> 
                     :
                  <div>
                     <ul className="dropdown-user loggIn">
                        <li>
                            <form className="form-horizontal form-material p-10" noValidate onSubmit={this.validateForm}>
                                <h3 className="box-title m-b-20">Sign In</h3>
                                                                
                                <div className="form-group ">
                                    <div className="col-xs-12">
                                        <input className="form-control" type="text" required="" placeholder="email" name="email" onChange={this.handleChange} /> </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-12">
                                        <input className="form-control" type="password" required="" placeholder="Password" name="password" onChange={this.handleChange} /> </div>
                                </div>
                                <div className="form-group text-center m-t-20">
                                    <div className="col-md-8 m-a">
                                        <button type="submit" className="btn btn-action btn-max btn-lg btn-block btn-normal font-14 text-uppercase waves-effect waves-light text-default">Log In</button>
                                    </div>
                                </div>
                            </form>
                        </li>
                     </ul>
                    </div>
                }
             </div>
       
    )
  }
}
// Login.propTypes = {
//     auth:PropTypes.object.required
// }

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors
});
export default connect(mapStateToProps,{login,fetchUserInfo,logoutUser})(withRouter(Login));
