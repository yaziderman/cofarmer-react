import React, { Component } from 'react'
import classNames from 'classnames/bind';
import Select from 'react-select';
import Helpers from '../../shared/custom';

export default class EditMultiSelect extends Component {

  constructor(props){
    super(props);
  }
    
  render() {     
    let title = this.props.title; 
    let placeholder = this.props.placeholder || "Select...";  
    let titleClass = this.props.titleClass;  
    return (
      <div className={classNames(!Helpers.isEmpty(this.props.additionalClassName)?this.props.additionalClassName:'')}>
          <div className="col-lg-12 p-0 float-left select">
            {title?<h5 className={titleClass?titleClass:""}>{title}</h5>:""} 
            <div>
              <Select className="font-14 col-md-12 p-0 m-0" name={this.props.name} isMulti options={this.props.options} placeholder={placeholder} value={this.props.value} onChange={this.props.onChange}   />                
            </div>     
          </div>
      </div>
    )
  }
}
