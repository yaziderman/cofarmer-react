import React, { Component } from 'react';
import Helper from '../../shared/custom';
import config from '../../shared/config';
import store from '../../store';
import Axios from "axios";
import { LoadingOverlay, Loader } from 'react-overlay-loader';

class ManageAdmins extends Component {

  constructor(props){
    super(props);
    
    this.state={
        auth:{},
        admins:[],
        adminEmails:[],
        uri:null,
        type:null,
        owner:null,
        email:undefined,
        isEditable:false,
        showForm:false,     
        loading:false
    }

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.fetchAdmins = this.fetchAdmins.bind(this);
    this.handleFetchAdmins = this.handleFetchAdmins.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
   
  }
  
  componentDidMount() {  
    let uri = this.props.uri;
    let type = this.props.type;
    this.setState({
      uri:uri,
      type:type
    })
    this.fetchAdmins();
  }

  componentWillReceiveProps(nextProps){    
    let uri = nextProps.uri;
    let type = nextProps.type;

    this.setState({
      uri:uri,
      type:type
    })
    this.fetchAdmins();
  }

  showForm() {
    this.setState({showForm:true});
  }

  hideForm() {
    this.setState({showForm:false});
  }

  fetchAdmins(reload){
    if(!reload && this.state.uri && this.props.uri == this.state.uri ){
      return false;
    }
    this.setState({loading:true});
    Axios.get(
      Helper.apiURL({ 
        uri:":type/:uri/admin/list",
        pathVar:{
          type:this.props.type,
          uri:this.props.uri,
        }
      })
    )
    .then((response) => { this.handleFetchAdmins(response); })
    .catch((response) => { 
      this.handleResponse("error",response); 
      
    });
    
  }

  handleFetchAdmins(response) {
    this.setState({loading:false}); 
    var data = response.data;    
    if(data.status == 200){
      
      let admins = data.result || [];      
      let adminEmails = [];
      let owner = null;
      let isEditable = false;
      
      let storeState = store.getState();
      let storAuth = storeState.auth;
      let loggedInUser = {uniqueId:null}

      if(storeState.auth && storeState.auth.user){
        loggedInUser = storeState.auth.user;
      }

      if(admins && admins.length > 0){
        admins.forEach(admin => {
          if(admin.email){
            adminEmails.push(admin.email);
          }
          
          if(admin.adminOwner === true){
            owner = admin;
            if(loggedInUser.uniqueId && loggedInUser.uniqueId == admin.uniqueId){
              isEditable = true;
            }
          }        

        });
      }

      this.setState({
        admins:admins,
        adminEmails:adminEmails,
        showForm:false,
        owner:owner,
        isEditable:isEditable,
        auth:storAuth
      })

    }else{
      Helper.handleError(data);
    }
  }
 
  checkEmail(){
    let email = this.state.email;

    if(Helper.isEmpty(email)){
      Helper.pushTError("EMAIL_REQUIRED");
      return false;
    }

    if(!Helper.isValidEmail(email)){
      Helper.pushTError("INVALID_EMAIL");
      return false;
    }

    let adminsEmails = this.state.adminEmails
    if(adminsEmails.indexOf(email) > -1){
      Helper.pushTError("ADMIN_EMAIL_EXIST");
      return false;
    }
    this.setState({loading:true});
    Axios.post(
      Helper.apiURL({ 
        uri:":type/:uri/admin/add",
        pathVar:{
          type:this.state.type,
          uri:this.state.uri,
        },
        query:{
          email:email
        } 
      }),
      {}
    )
    .then((response) => { this.handleResponse("success",response,"ADMIN_ADDED"); })
    .catch(err => {       
      this.handleResponse("error",err.response);
    });

  }

  handleResponse (type,response,successMsg){  
    this.setState({loading:false}); 
    var data = response.data; 
    if(type == "success" && data.status == 200){
      Helper.pushTSuccess(successMsg);
      this.fetchAdmins(true);
    }else{ 
      Helper.handleError(data);
    }
  }

  handleFieldChange(e){
    let field = e.target.name;
    let value = e.target.value;    
    if(field){
      this.setState({[field]:value});
    }    

  }

  handleDelete(e){

    let email = e.target.dataset.email;//("email");
    if(!email){
      return false;
    }
   this.setState({loading:true});
    Axios.delete(
      Helper.apiURL({
        uri:":type/:uri/admin/remove",
        pathVar:{
          type:this.state.type,
          uri:this.state.uri,
        },
        query:{
          email:email
        } 
      }),
      {}
    )
    .then((response) => { this.handleResponse("success",response,"ADMIN_REMOVED"); })
    .catch((response) => { this.handleResponse("error",response); });
  }

  renderAdmin(admin, loggedInUserUniqueId){

    let isEditable = this.state.isEditable;
    let owner = this.state.owner;
    let isOwner = false;
    let adminImage = admin.image || config.defaultUserImage;
    adminImage = Helper.dataPath(adminImage);

    let showDelete = isEditable;
    
    if(loggedInUserUniqueId && loggedInUserUniqueId == admin.uniqueId){      
      showDelete = true;
    }
    if(!Helper.isEmpty(admin) && !Helper.isEmpty(owner) && admin.uniqueId == owner.uniqueId){
      showDelete = false;
      isOwner = true;
    }

    return(
      <div className="row">
          <div className="col-md-12">
              <img src={adminImage} className="img-circle pull-left m-r-20 m-b-10 float-left" width="60" height="60"/>
              <div className="verticle-h">
                  <h6 className="font-bold text-info">{admin.fullName}</h6>                  
                  {showDelete?<span><button className="point btn-plain fa fa-times text-danger" title="Remove Admin" data-email={admin.email} name="" onClick={this.handleDelete}></button></span>:""}  
                  {isOwner?<span><button className="point btn-plain fa fa-user text-success" title="Page Owner"></button></span>:""}
                  <span>{admin.email}</span> 
              </div>
          </div>
          
      </div>
    )
    
  }

  render() {
    let admins = this.state.admins;
    let loggedInUserUniqueId = null;
    let auth = this.state.auth;
    let {loading} = this.state;
    let type = this.state.type;
    if(auth.isAuthenticated && auth.user.uniqueId){
      loggedInUserUniqueId = auth.user.uniqueId;
    }
    return (
      <div>
          <div className="card text-left">
                {/* <LoadingOverlay>
                   
                </LoadingOverlay> */}
                 <LoadingOverlay>
                <div className="card-body">
                <Loader  loading={loading}/>
                    <h5 className="font-bold">
                    {
                      type == "event"?
                      "Event Admins"
                      :
                      "Page Admins"
                    }
                    
                    </h5>
                      {
                          admins.map((admin, index) => (
                            <div key={"invAdmin"+index}>
                              {this.renderAdmin(admin,loggedInUserUniqueId)}
                            </div>                            
                          ))
                    }
                    
                    {this.state.isEditable ?
                      <ul className="list-style-none">                            
                            {!this.state.showForm ?
                                <li className="box-label">  <a onClick={this.showForm}  className="text-info">+ Add New Admin</a></li>
                                :
                                <li className="input-group col-md-12 p-0">
                                        <input type="text" className="form-control" name="email" placeholder="Enter email address" onChange={this.handleFieldChange} />
                                        <div className="input-group-append closeInputFilter" onClick={this.checkEmail}>
                                            <span className="input-group-text" id="basic-addon2">
                                                <i className="ti-check"></i>
                                            </span>
                                        </div>
                                        <div className="input-group-append closeInputFilter" onClick={this.hideForm}>
                                            <span className="input-group-text" id="basic-addon2">
                                                <i className="ti-close"></i>
                                            </span>
                                        </div>
                                </li>
                            } 
                            
                        </ul>
                    :
                    ""
                    }                    
                </div>
                </LoadingOverlay>
            </div>    
      </div>
    )
  }
}
export default (ManageAdmins);
