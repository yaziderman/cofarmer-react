import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect ,Link} from 'react-router-dom';
import store from '../../store';
import { login } from '../../actions/authAction';
import Helper from '../../shared/custom';
import storeAuth from '../../utils/storeAuth';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import { fetchUserInfo } from '../../actions/authAction';
import { logoutUser } from '../../actions/authAction';
import qs from "query-string";

class Loginpage extends Component {

  constructor(props){
      
      super(props)

      this.state = {
        auth:{},
        email:"",
        password:"",
        loading:false,    
        error:"",
        referal:""
      }
      this.validateForm    = this.validateForm.bind(this);       
      this.handleChange = this.handleChange.bind(this);

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
        }
        if(storeState.errors){
            this.setState({
                loading:storeState.errors.loading
            })   
        }
        
    }); 
  }  

  componentDidMount(){
    var storeState = store.getState();
    this.setState({auth:storeState.auth},()=>{
        if(this.state.auth.isAuthenticated){
            setTimeout(() => {
                this.props.fetchUserInfo(); 
            });
            
        }
    });    
    
    
    let referal = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).referal;
      referal += window.location.hash;
    this.setState({referal:referal});


  }

  componentWillReceiveProps(nextProps){

    if(!Helper.isEmpty(nextProps.errors)){
        this.setState({
            loading:nextProps.errors.loading,
        });
        let error = nextProps.errors.error;
    }
    
  }

  
  validateForm(event){
    event.preventDefault();
      
    const email = this.state.email;
    const password = this.state.password;      
    if( email == "" || password == ""){
        Helper.pushError("Please fill all required fields")
        return false;
    }
    this.setState({
        loading:true
    })
    const data = {email:email,password:password}
    this.props.login(data);
    event.preventDefault();

    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    
  render() {
   

   
    let isAuthenticated = this.state.auth.isAuthenticated;
    if(isAuthenticated){
        let referal = localStorage.getItem("referal");
        let redirectTo = (Helper.isEmpty(referal))?null:referal;
        localStorage.removeItem("referal");
        if (redirectTo)
            return <Redirect to={redirectTo} />;

        let lastPath = this.props.location.state ? this.props.location.state.from.pathname:'/';
        if (lastPath)
            return <Redirect to={lastPath} />;
    }

    const { loading } = this.state;
    return (
      <div>
        
          <div className="login-register customCard">
            <div className="col-lg-6 m-a auth-card">
                <div className="card-body m-t-40">
                    <h1 className="m-t-40 font-normal">Welcome to CoFarmer</h1>
                    <p className="font-medium">
                        Sign in to access Cofarmer.
                    </p>
                    <LoadingOverlay>
                        <Loader loading={loading}/>
                        <form className="form-horizontal col-10 m-t-20 m-a" id="loginform" action="index.html">
                        
                            <div className="form-group">
                                    <label className="control-label text-black m-b-0">Email</label>
                                    <input className="form-control" type="text" required=""  name="email" onChange={this.handleChange}/> 
                            </div>
                            <div className="form-group">
                                    <label className="control-label text-black m-b-0">Password</label>
                                    <input className="form-control" type="password" required=""  name="password" onChange={this.handleChange} maxLength="32"/> 
                            </div>
                            
                            <div className="form-group text-center m-t-20">
                                <div className="col-xs-12 col-lg-8 m-a">
                                    <button className="btn btn-action btn-max btn-md btn-block text-uppercase waves-effect waves-light" onClick={this.validateForm}>Sign In</button>
                                </div>
                            </div>

                        </form>

                    </LoadingOverlay>
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

export default connect(mapStateToProps,{login,fetchUserInfo,logoutUser})(withRouter(Loginpage));
