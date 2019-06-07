import React, { Component } from 'react';
import Helper from '../../shared/custom';
export default class MiniCard extends Component {

  constructor(props){
    super(props);
    this.getContent = this.getContent.bind(this);
  }

  getContent(type){
    let value = this.props.value;
  
    switch(type){
      case "boolean":
        return value ? <span className="float-right text-right font-16 font-bold text-green">Yes</span> :
                        <span className="float-right text-right font-16 font-bold text-danger">No</span> 
      case "array" :
        let newValue = Array.isArray(value) ? value : [value];
        return <span className="float-right mini-arraycard text-default text-medium font-16">{newValue.join(", ")}</span>;
      default :
        return <span className="float-right text-right font-16 font-medium">{value}</span>
    }
  }
    
  render() {
    let label = this.props.label;
    let value = this.props.value;
    let type = this.props.type ?this.props.type :""
    return (
        <div className="col-md-6 col-sm-12 float-left p-1">
            <div className="col-12 mini-card float-left">
                <div className="font-bold float-left font-16">{label}</div>
                {this.getContent(type)}
            </div>
        </div>
    )
  }
}
