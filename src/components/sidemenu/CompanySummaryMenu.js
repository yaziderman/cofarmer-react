import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,Switch ,withRouter} from "react-router-dom";
import LocationFilter from '../sidemenu/LocationFilter';
import BusinessMetaFields from '../sidemenu/BusinessMetaFields';
import Helpers from '../../shared/custom';

class CompanySummaryMenu extends Component {

    constructor(props){
        super(props)
        this.state ={
          context:undefined,
          selectedLocation:""
        }
        this.handleLocation = this.handleLocation.bind(this);
       
      }
    handleLocation(selectedLocation){
       this.props.getLocationIdFunc(selectedLocation)
    }

  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let location = this.props.location.pathname;
    let parts = location.split('/')
    let index = parts.length-2;
    let type = parts[index];

    return (
        <div>
        { isLoggedIn?
             <div>
                 <ul className="nav-pills list-style-none components profileMenu sideAnchor listMenu">
                 <li>
                     <a href={"/companies"} className="nav-link"> 
                         Companies
                     </a>
                 </li>
                 <li>
                     <a href="/companies/my-companies" activeclassname='active'  className="nav-link"> 
                         My Companies
                     </a>
                 </li>
                 <li>
                    <a href="/create-company/start" className="text-a"> 
                       Create New Company
                    </a>
                 </li>
                 </ul>
                 {type === "sector" ?
                     <div>
                        <hr/>
                         <ul className="nav nav-pills nav-side nav-stacked list-style-none components p-b-20 searchMenu">
                             <h6 className="text-left font-bold m-t-10">Filter Results</h6>
                             <div>
                                 <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" onSelectLocation={this.handleLocation} />
                             </div>
                         </ul>
                     </div>
                     :
                     ""
                 }
             </div>
             :""
 
         } 
               
       </div>
    )
  }
}
export default  withRouter(CompanySummaryMenu);