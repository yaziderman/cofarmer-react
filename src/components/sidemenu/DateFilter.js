import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import { globalSearch } from "../../actions/searchAction";
import DatePicker from "react-datepicker";


 class DateFilter extends Component {

  constructor(props){
      super(props);
 
        this.state = {
            enterDate:false,
            from:new Date(),
            to:new Date(),
            type:undefined
        }
      this.enterDate = this.enterDate.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.filterByYear = this.filterByYear.bind(this);
      this.onChangeFromDate = this.onChangeFromDate.bind(this);
      this.onChangeToDate = this.onChangeToDate.bind(this);
  }  
  componentDidMount(){
      this.setState({
        type:this.props.type
      })
  }

  onChangeFromDate(e){
    this.setState({
        from:e,
    })
  }
  onChangeToDate(e){
    this.setState({
        to:e,
    })
  }

  enterDate(e){
    e.preventDefault();
    this.setState({
        enterDate: this.state.enterDate? false : true
    })

    if(!this.state.enterDate){
        this.setState({
            from:"",
            to:""
        })
    }
 }



onChangeDate(e){
    var elem = e.target;
    Helper.onlyNumbers(elem);
    if(Helper.onlyNumbers(elem)){
        this.setState({[e.target.name]:e.target.value},()=>{
        });
    }
}

filterByYear(e){
    e.preventDefault();
    let criteria = {};
    if(this.state.type == "date"){
        criteria.startDate = Helper.getDateInInputFormat(this.state.from);
        criteria.endDate = Helper.getDateInInputFormat(this.state.to)
    }else{
        criteria.from = this.state.from;
        criteria.to = this.state.to;
    }
    
    this.props.globalSearch(criteria);
}


  render() {
    let type = this.props.type;
    return (
      <div>
        <div className="text-left m-t-20 demo-checkbox filter-input">
                <h5>{type == "date" ? "Date Range" : "Year Founded"}</h5>
                { !this.state.enterDate ?

                    <li> 
                        <a href="" onClick={this.enterDate} className="text-info">
                            <i className="fa fa-plus float-left"></i>
                            <span className="float-left addSearch"> Choose {type == "date" ? "Date" : "Year"}</span>
                        </a>
                    </li>

                    :
                    type == "date" ?
                        <li className="p-r-20">
                            <a href="" onClick={this.enterDate} className="text-danger float-right p-0"><i className="fa fa-times-circle m-0"></i></a>
                            <DatePicker
                                className="form-control"
                                selected={this.state.from}
                                onChange={this.onChangeFromDate}
                                placeholderText="Choose from date"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                              />
                               <DatePicker
                                className="form-control m-t-10"
                                selected={this.state.to}
                                onChange={this.onChangeToDate}
                                placeholderText="Choose to date"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                              />
                            <button className="btn btn-success m-t-5 float-right" onClick={this.filterByYear}>Filter</button>
                        </li>
                        :

                        <li className="p-r-20">
                            <a href="" onClick={this.enterDate} className="text-danger float-right p-0"><i className="fa fa-times-circle m-0"></i></a>
                            <input className="form-control" placeholder="From Year" name="from" maxLength="4" onChange={this.onChangeDate} />
                            <input className="form-control m-t-5" placeholder="To Year" name="to" maxLength="4" onChange={this.onChangeDate} />
                            <button className="btn btn-success m-t-5 float-right" onClick={this.filterByYear}>Filter</button>
                        </li>
                


                }
          </div>
      </div>
    )
  }
}


export default connect(null,{globalSearch})(withRouter(DateFilter));