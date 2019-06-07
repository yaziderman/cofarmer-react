import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import { globalSearch } from "../../actions/searchAction";
import config from '../../shared/config';
import DatePicker from "react-datepicker";

 class FilterByDate extends Component {

  constructor(props){
      super(props);
 
        this.state = {
            enterDate:false,
            fromDate:new Date(),
            toDate:new Date()
        }
      this.enterDate = this.enterDate.bind(this);
      this.handleFromDate = this.handleFromDate.bind(this);
      this.handleToDate = this.handleToDate.bind(this);
      this.filterByDate = this.filterByDate.bind(this);
      this.resetFilter = this.resetFilter.bind(this);
  }  

  enterDate(e){
    e.preventDefault();
    this.setState({
        enterDate: this.state.enterDate? false : true
    })
 }



handleFromDate(date){
    this.setState({fromDate:date});
}
   
handleToDate(date){
    this.setState({toDate:date});
}

resetFilter(){
    this.setState({fromDate:"",toDate:""});
    if(this.props.getDateFilterValues){
        this.props.getDateFilterValues("")
    }
}

filterByDate(e){
    e.preventDefault();
    let filterDates = {};
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    filterDates.from = fromDate ?  Helper.getDateInInputFormat(fromDate) : "";
    filterDates.to = toDate ?   Helper.getDateInInputFormat(toDate) : "";
    if(this.props.getDateFilterValues){
        this.props.getDateFilterValues(filterDates)
    }
   
}

  render() {
    
    return (
      <div>
        <div className="text-left m-t-20 demo-checkbox filter-input">
                <h5>Filter by Dates</h5>
                { !this.state.enterDate ?

                    <li> 
                        <a href="" onClick={this.enterDate} className="text-info">
                            <i className="fa fa-plus float-left"></i>
                            <span className="float-left addSearch"> Choose Dates</span>
                        </a>
                    </li>

                    :
                    <li className="p-r-20">
                        <a href="" onClick={this.enterDate} className="text-danger float-right p-0"><i className="fa fa-times-circle m-0"></i></a>
                            <DatePicker
                                selected={this.state.fromDate}
                                onChange={this.handleFromDate} 
                                className="full-width"
                                todayButton={"Today"}
                                placeholderText="From"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                            <br/>
                            <DatePicker
                                selected={this.state.toDate}
                                onChange={this.handleToDate} 
                                placeholderText="To"
                                className="full-width m-t-10"
                                todayButton={"Today"}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        <button className="btn btn-danger m-t-5 float-left" onClick={this.resetFilter}>Clear</button>
                        <button className="btn btn-success m-t-5 float-right" onClick={this.filterByDate}>Filter</button>
                    </li>


                }
          </div>
      </div>
    )
  }
}


export default withRouter(FilterByDate);