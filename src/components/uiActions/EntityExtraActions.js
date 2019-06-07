import React, { Component } from 'react';
import Helper from '../../shared/custom';
import { withRouter } from 'react-router-dom';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import ClaimPopup from '../uiActions/ClaimPopup';


class EntityExtraActions extends Component {

  constructor(props){
        super(props);
        this.state = {
                loading:false,
                ClaimPopupOpen: false,
                localProps:{}


        }
        this.openModal = this.openModal.bind(this);
        
  }

  
  
  openModal() {
        this.setState({ ClaimPopupOpen: true });
      }
  
 closeDropDown(){
        let elem = document.getElementsByClassName("dropdown-menu-right");
        if(!Helper.isEmpty(elem)){
           for(var i=0; i<elem.length; i++){
                elem[i].classList.remove("show")
           }
       }
 }


  render() {
        let loading = this.state.loading;
        
    return (
       
        
      <div>
        <LoadingOverlay>
                <Loader fullPage loading={loading}/>
        </LoadingOverlay>

            <div className="dropdown">
                <a className="text-muted dropdown-toggle newsDropdown"  id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h text-default"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right mailbox ddMailbox"  aria-labelledby="dropdownMenuButton1">
                    <div className="message-center">
                       
                                  <a className="dropdown-item text-blue-" href="javascript:void(0)" onClick={this.openModal}>
                                        <div className="dpIcon m-r-5">   
                                        <i className="fas fa-bookmark"></i>
                                        </div>
                                        <div className="mail-contnet dd-content">
                                        <h5 className="font-medium font-14 text-blue-">Claim Ownership</h5>
                                        <span className="mail-desc font-I-10 text-blue-">Request Admin Access to this page</span> 
                                        </div>
                                </a>
                             
                        </div>
                    </div>
                    <ClaimPopup open={this.state.ClaimPopupOpen} pageType={this.props.objectType} uri={this.props.uri}/> 
            </div>
      </div>
    )
  }
}

export default (withRouter(EntityExtraOptions));