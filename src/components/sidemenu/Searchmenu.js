import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeGlobalSearch } from '../../actions/searchAction';
import { globalSearch } from "../../actions/searchAction";
import { getMetaData } from '../../actions/metaAction';
import { getSectorData } from '../../actions/businessAction';
import Helper from '../../shared/custom';
import store from '../../store';

import MetaFields from '../sidemenu/MetaFields';
import MetaFields1 from '../sidemenu/MetaFields';
import LocationFilter from '../sidemenu/LocationFilter';
import BusinessMetaFields from '../sidemenu/BusinessMetaFields';
import DateFilter from '../sidemenu/DateFilter';
import RoleFilter from '../sidemenu/RoleFilter';
import ShortFilter from '../sidemenu/ShortFilter';

 
 class Searchmenu extends Component {
    constructor(props){
        super(props);
        

        this.state = {
            view :"search",
            showEdit:false,
            metaList:{},
            business:{},
            enterDate:false,
            metaActive:[],
            tabStatus:"all"
            
        }
       
        // store.subscribe(() => { 
        //     var storeState = store.getState();            
        //     var tabStatusInStore = storeState.search.tabStatus || "all";
                        
        //     var localMetaList = this.state.metaList;
        //     var storeMetaList = storeState.meta.metaList;

        //     var localBusiness = this.state.business;
        //     var storeBusiness = storeState.business.data;

        //     if(JSON.stringify(localMetaList) != JSON.stringify(storeMetaList)){
        //         this.setState({metaList:storeMetaList});
        //     }

        //     if(JSON.stringify(localBusiness) != JSON.stringify(storeBusiness)){
        //         this.setState({business:storeBusiness});
        //     }

        //     if(tabStatusInStore != this.state.tabStatus){
        //         this.setState({tabStatus:tabStatusInStore});               
        //     }
            
        //  }); 

         this.getFilterComponents = this.getFilterComponents.bind(this);
         this.backToPage = this.backToPage.bind(this);
       
    }

    componentDidMount(){
        var storeState = store.getState();
        let tabStatus = storeState.search.tabStatus || "all";          
        let meta = storeState.meta;
        let business = storeState.business;


        if(Helper.isEmpty(business.data) == true){            
            this.props.getSectorData();
        }else{
            this.setState({business:business.data});
        }
     
        if(Helper.isEmpty(meta.metaList) == true){
            this.props.getMetaData();
        }else{
            this.setState({metaList:meta.metaList});
        }


        this.setState({tabStatus:tabStatus});
    }

    componentWillReceiveProps(props){
        var storeState = store.getState();            
        var tabStatusInStore = storeState.search.tabStatus || "all";
                    
        var localMetaList = this.state.metaList;
        var storeMetaList = storeState.meta.metaList;

        var localBusiness = this.state.business;
        var storeBusiness = storeState.business.data;

        if(JSON.stringify(localMetaList) != JSON.stringify(storeMetaList)){
            this.setState({metaList:storeMetaList});
        }

        if(JSON.stringify(localBusiness) != JSON.stringify(storeBusiness)){
            this.setState({business:storeBusiness});
        }

        if(tabStatusInStore != this.state.tabStatus){
            this.setState({tabStatus:tabStatusInStore});               
        }
        
    }
    
    backToPage(){
        this.props.globalSearch({});
        this.props.history.goBack();
    }    
    getFilterComponents(tabStatus){

        switch(tabStatus) {
            case 'people':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>
                        <RoleFilter filterKey="ROLES" filterTitle="Roles" filterCriteria="role" />
                        <MetaFields metaKey="CTI" metaTitle="Postion" metaCriteria="position" />
                    </div>
                );
            case 'companies':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>
                        <MetaFields metaKey="CTU" metaTitle="Company Type" metaCriteria="company_types" />
                        <MetaFields metaKey="CSI" metaTitle="Company Size" metaCriteria="company_size" />
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Area Served" filterCriteria="areas" type="area" />
                        {/* <MetaFields metaKey="ARS" metaTitle="Area Served" metaCriteria="areas" /> */}
                        {/* <BusinessMetaFields businessTitle="Sector" businessCriteria="sectors" businessKey="sectorsArray" /> */}                      
                        <DateFilter />
                    </div>
                );
            case 'startups':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />   
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>   
                        <MetaFields metaKey="FUS" metaTitle="Funding Status" metaCriteria="funding_status" />                  
                        <MetaFields metaKey="FUT" metaTitle="Funding Type" metaCriteria="funding_type" />
                        <MetaFields1 metaKey="CSI" metaTitle="Company Size" metaCriteria="company_size" />
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Area Served" filterCriteria="areas" type="area" />
                        <DateFilter />
                    </div>
                );
            case 'investors':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />   
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>   
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Area Served" filterCriteria="areas" type="area" />
                    </div>
                );
            case 'opportunities':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />   
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>  
                        <MetaFields metaKey="RIS" metaTitle="Risk" metaCriteria="risk" /> 
                        <MetaFields metaKey="BUD" metaTitle="Investment Amount" metaCriteria="investmentAmount" />
                    </div>
                );
            case 'events':
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />   
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>   
                        <DateFilter type="date"/>
                    </div>
                );
            default:
                return (
                    <div>
                        <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" />
                        <BusinessMetaFields businessTitle="Industry" businessCriteria="industries" businessKey="industriesArray"/>
                    </div>
                );
        }
  }

  render() {
    var tabStatus = this.state.tabStatus;
    return (
      <div>
         <ul className="nav nav-pills  nav-stacked list-style-none components searchLi">
            <li>
                <a href="#" className="nav-link font-bold" onClick={this.backToPage}> 
                        &#60; Back
                </a>
            </li> 
            <h6 className="text-left font-bold m-t-10">Filter Results</h6>
             {this.getFilterComponents(tabStatus)}
         </ul>
      </div>
    )
  }
}


export default connect(null,{removeGlobalSearch, globalSearch, getMetaData , getSectorData})(withRouter(Searchmenu));