import React, { Component } from 'react';
import Helper from '../../shared/custom';
import {Link } from "react-router-dom";

export default class InfoSectorLinks extends Component {
  
  getLinks(items){
    if(!Helper.isEmpty(items)){      
        return items.map((item,index)=>(
            <div>
              {index > 0 ? "," : ""} 
              <Link to={"/companies/sector/"+item.id}>{item.name}</Link>
            </div>
        ))
    }    
    return "";
  }
  render() {
    let items = this.props.items && this.props.single ? [this.props.items] : this.props.items;
    let length = items ? items.length : 0;
    let title = this.props.title;
    return (
      <div>
        {length > 0?
          <div>
            {title? <h6>{title}</h6> : ""}
            {this.getLinks(items)}
          </div>
          :""
        }
      </div> 
    )
  }
}
