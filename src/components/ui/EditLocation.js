import React, { Component } from 'react'
import Axios from 'axios';
import countries from "../../shared/country";
import Select from 'react-select';
import ApiHelper from "../../shared/ApiHelper";

export default class EditLocation extends Component {

  constructor(props){
    super(props);
    this.state = {
      country:undefined,
      city:undefined,
      cityList:[]
    }
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  
  componentDidMount(){
    this.setState({
      country:this.props.country,
      city:this.props.city
    })
  }

  componentWillReceiveProps(newProps){    
   
    this.setState({
      country:newProps.country,
      city:newProps.city
    })
  }

  handleValueChange(option,e){  
    
    let onValueChange = this.props.onValueChange;   
    
    let thisFieldName = e.name;
    let thisFieldValue = option.value;  

    if(thisFieldName == "country"){
      this.fetchCityListForCountry(thisFieldValue);      
    }
    this.setState({[thisFieldName]:option});
    //onValueChange(option,e);
  }

  setCityList(cityList){
    this.setState({cityList:cityList})
  }

  fetchCityListForCountry(countryId){       
    if(countryId){
      ApiHelper.getCities(countryId,this.setCityList);
    }
  }

  render() {
     
    let options = this.props.options || {};
    let countryList = countries;
    let countryOptions =[];
    countryList.forEach(function(item,index){
      countryOptions.push({value:item.id,label:item.name});
    });

    let cityList = this.state.cityList;
    let cityOptions = [];
    cityList.forEach(function(item,index){
      cityOptions.push({value:item.id,label:item.name});
    });
    
    let title = this.props.title || "Select Location";    
    
    return (
      <div>
          <div className="col-lg-12 p-0 float-left">
            <h5>{title}</h5>
            <div className="row">
                <div className="col-md-6">
                  <Select className="font-14 col-md-12 p-0 m-0" name="country" placeholder="Select country" value={this.state.country} onChange={this.handleValueChange} options={countryOptions}  />
                </div>
                <div className="col-md-6">
                  <Select className="font-14 col-md-12 p-0 m-0" name="city" placeholder="Select city" value={this.state.city} onChange={this.handleValueChange} options={cityOptions} />
                </div>
            </div>     
          </div>
      </div>
    )
  }
}
