import React, { Component } from 'react'

export default class InfoAddress extends Component {
  render() {
    let address = this.props.address;
    let title = this.props.title;
    if(!address){
      return(<div></div>)
    }

    var addressArray1 = [];
    var addressArray2 = [];
    var addressArray3 = [];
    var line1 = null;
    var line2 = null;
    var line3 = null;

    if(address.addressLine1)
    addressArray1.push(address.addressLine1)

    if(address.addressLine2)
    addressArray1.push(address.addressLine2)

    if(address.addressLine3)
    addressArray1.push(address.addressLine3)

    if(address.stateOrProvince)
    addressArray2.push(address.stateOrProvince)
    
    if(address.pobox)
      addressArray2.push(address.pobox)
    
    if(address.zip)
      addressArray2.push(address.zip)

    if(address.city){      
      if(address.city.name){
        addressArray3.push(address.city.name)
      }else if(address.city.label){
        addressArray3.push(address.city.label)
      }      
    }
    
    if(address.country){      
      if(address.country.name){
        addressArray3.push(address.country.name)
      }else if(address.country.label){
        addressArray3.push(address.country.label)
      }      
    }


    if(addressArray1.length > 0){
      line1 = addressArray1.join(", ");
    }

    if(addressArray2.length > 0){
      line2 = addressArray2.join(", ");
    }

    if(addressArray3.length > 0){
      line3 = addressArray3.join(", ");
    }

    return (
        <div>
          {/* {title && (line1 || line2 || line3) ?<h6>{title}</h6>:""} */}
          <h6>{title}</h6>
          {line1?<div>{line1}</div>:""}
          {line2?<div>{line2}</div>:""}
          {line3?<div>{line3}</div>:""}
        </div>
    )
  }
}
