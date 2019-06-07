import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,Switch ,withRouter} from "react-router-dom";
import LocationFilter from '../sidemenu/LocationFilter';
import BusinessMetaFields from '../sidemenu/BusinessMetaFields';
import Helpers from '../../shared/custom';
import FilterByDate from '../sidemenu/FilterByDate';

class Eventsummarymenu extends Component {
  constructor(props){
    super(props)
    this.state ={
      context:undefined,
      selectedLocation:""
    }
    this.handleLocation = this.handleLocation.bind(this);
    this.getselectedDates = this.getselectedDates.bind(this);
  }

  handleLocation(selectedLocation){
    this.props.getLocationIdFunc(selectedLocation)
  }
  getselectedDates(dates){
    this.props.getDateFilterValues(dates)
  }


  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let location = this.props.location.pathname;
    let parts = location.split('/')
    let index = parts.length-2;
    let type = parts[index];
    let context = this.props.context;
 
    return (
      <div>
       { isLoggedIn?
            <div>
                <ul className="nav-pills list-style-none components profileMenu sideAnchor listMenu">
                <li>
                    <a href={"/events"} className="nav-link"> 
                        All Events
                    </a>
                </li>
                <li>
                    <a href="/events/upcoming" className="nav-link"> 
                        Interested Events
                    </a>
                </li>
                <li>
                    <a href="/events/my-events" className="nav-link"> 
                      My Events
                    </a>
                </li>
                <li>
                    <a href="/create-event/start" className="text-a"> 
                        Create New Event
                    </a>
                 </li>
                </ul>
                {location === "/events/upcoming" || type === "sector" ?
                    <div>
                       <hr/>
                        <ul className="nav nav-pills nav-side nav-stacked list-style-none components p-b-20 searchMenu">
                            <h6 className="text-left font-bold m-t-10">Filter Results</h6>
                            <div>
                                <LocationFilter filterKey="COUNTRIES" filterTitle="Locations" filterCriteria="locations" onSelectLocation={this.handleLocation}/>
                                <FilterByDate getDateFilterValues={this.getselectedDates}/>
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



export default  withRouter(Eventsummarymenu);