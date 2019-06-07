import React, { Component } from 'react';
import BusinessMetaFields from './BusinessMetaFields';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import Helper from '../../shared/custom';

import { globalSearch } from "../../actions/searchAction";

import { getMetaData } from '../../actions/metaAction';
import { getSectorData } from '../../actions/businessAction';

class NewsMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            metaList:{},
            business:{},
        }
        store.subscribe(() => { 
            var storeState = store.getState();            

            var localBusiness = this.state.business;
            var storeBusiness = storeState.business.data;
            if(JSON.stringify(localBusiness) != JSON.stringify(storeBusiness)){
                this.setState({business:storeBusiness});
            }
            
         }); 
       
    }

    componentDidMount(){
      var storeState = store.getState();   
      let business = storeState.business;
        if(Helper.isEmpty(business.data) == true){            
            this.props.getSectorData();
        }else{
            this.setState({business:business.data});
        }
    }

  render() {
    return (
      <div>
         <ul className="nav nav-pills nav-side nav-stacked list-style-none components p-b-20 sideNav">
            <li>
                <a href="#" className="nav-link font-bold p-0"> 
                        Filter Results
                </a>
            </li> 
            <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>
         </ul>
        
      </div>
    )
  }
}


export default connect(null,{getMetaData , getSectorData ,globalSearch})(withRouter(NewsMenu));