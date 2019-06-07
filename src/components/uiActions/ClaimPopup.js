import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import config from '../../shared/config';
import Helpers from '../../shared/custom';
import Axios from 'axios';
import MyPopup from '../ui/MyPopup';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import { timingSafeEqual } from 'crypto';

class ClaimPopup extends Component {

  constructor(props){
      super(props);
      this.state = {
        open: false,
        pageType:"",
        uri:"",
        localProps:{}
      }

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
  
  componentWillReceiveProps(props){
    if(props.open != this.state.open){
        this.setState({
          localProps:props,
          open:props.open,
          pageType:props.pageType,
          uri:props.uri
        });
    }
 
  }

  openModal (){
    this.setState({ open: true })
  }

  closeModal () {
    this.props.onClose && this.props.onClose();
    this.setState({ open: false });
  }

  requestClaim = () => {

    Axios.post(
        Helpers.apiURL({
            uri:"claim/:pageType/:uri",
            pathVar:{pageType:this.state.pageType, uri:this.state.uri}
        })
    )
    .then( (response) => {
      if (response.status == 200){
        // no need for message
        //Helpers.pushTSuccess("CLAIM_REQUEST_SET");
      }else{
        Helpers.pushTError("GENERIC_ERROR");
      }
      this.closeModal();
    })
    .catch((err) => {
      if (err.response && err.response.data.status){
        if (err.response.data.status == 400) {
          console.log(err.response.data.message);
          if (err.response.data.message == "\"ERR104\"")
            Helpers.pushTSuccess("ADMIN_IS_ALREADY_ASSIGNED");
          else
            Helpers.pushTError(err.response.data.message);
        }          
        else{
          Helpers.pushTError("GENERIC_ERROR");
        }
          
    }
    });
  }

  render() { 
   
    return (
        <MyPopup 
        open={this.props.open}
        onClose={this.props.onClose}
        content={
                <div className="text-left">
                    <p>Do you wish to register yourself as a Primary admin user of the entity?&nbsp; By doing so, and once approved by us, you will have full privileges to update your company details.</p>
                    {/* <ul>
                    <li><em>Raise requests</em></li>
                    <li><em>Update statuses</em></li>
                    <li><em>Post news</em></li>
                    <li><em>Follow other entities</em></li>
                    <li><em>Connect with other entities</em></li>
                    <li><em>Create Events</em></li>
                    <li><em>Validate your entity data page</em></li>
                    </ul> */}
                    <p><em>Click on the below button to send request for admin access:</em></p>   
                    <div className="text-center">
                        <button className={"btn btn-success"} onClick={this.requestClaim} >Request Admin Access</button> 
                    </div>
                    
                </div>
        }
    >
    </MyPopup>
    );
  }
}

export default (withRouter(ClaimPopup));