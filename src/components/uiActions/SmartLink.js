import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { login, fetchUserInfo, logoutUser  } from '../../actions/authAction';
import store from '../../store';
import STR from '../../shared/strings';

class SmartLink extends Component {
  constructor(props,context){
      super(props);
      this.state = {
          auth:{},
          isAuthenticated:false,
          isEditable:false,
          uri:undefined,
          type:undefined,
          info:{}
      }
      

      store.subscribe(() => {
        var storeState = store.getState();
        var auth = storeState.auth;
        let isAuthenticated = auth.isAuthenticated?true:false;        
        this.setState({
            auth:auth, 
            isAuthenticated:isAuthenticated
        });
      }); 
      
  }

  componentDidMount(){
    
    let storeState = store.getState();
    let isAuthenticated = storeState.auth && storeState.auth.isAuthenticated ? true : false;

    this.setState({
        uri:this.props.uri,
        type:this.props.type,
        isAuthenticated:isAuthenticated,
        auth:storeState.auth
    })
  }

  componentWillReceiveProps(nextProps){
    let currentUri = this.state.uri;
    let currentType = this.state.type;

    if(nextProps.type == currentType && nextProps.uri == currentUri){
        return false;
    }
    
    this.setState({
        uri:this.props.uri,
        type:this.props.type,
    })

  }
  
  checkEditable = () => {
    let isEditable = false;
    let auth = this.state.auth;

    if(auth.isAuthenticated && auth.user && auth.user.uniqueId){
        isEditable = this.props.ownerId == auth.user.id?true:false;
    }    
    return isEditable;
  }
  render() {
    if(!this.state.isAuthenticated){
        return(<div>Not authenticated</div>);
    }
    let masterClassName = this.props.masterClassName || "float-left";
    let showEdit = this.props.showEdit;
    let isEditable = false;
    if(showEdit){
        isEditable = this.checkEditable();
    }

    return (
      <div className={masterClassName}>
        {isEditable && showEdit ? 
            <Link to={this.props.pageFullUri}>
                <button className={"btn btn-info m-r-10 m-l-10"}>{STR.EDIT}</button>
            </Link>            
        :
        ""
       }
      </div>
    )
  }

}

export default connect(null,{login,fetchUserInfo,logoutUser}) (withRouter (SmartLink));