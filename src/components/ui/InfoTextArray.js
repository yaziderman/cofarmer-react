import React, { Component } from 'react';
import Helper from '../../shared/custom';

export default class InfoTextArray extends Component {
  getLink(textArray){
    if(!Helper.isEmpty(textArray)){
      if(this.props.type =="email"){
          return textArray.map((data,i)=>(
              <a href={"mailto:"+data} key={"email"+i}>{data}{i == (textArray.length-1) ? ' ' : ', '}</a>
            ))
      }else if(this.props.type =="phone"){
            return textArray.map((data,i)=>(
             <a href={"tel:"+data} key={"tel"+i}>{data}{i == (textArray.length-1) ? ' ' : ', '}</a>
            ))
      }
      else{
            return  textArray.join(', ');
      }
    }
  
  }
  render() {
    let textArray = this.props.textArray;
    let length = textArray ? textArray.length : 0;

    let text = [];
    let type = this.props.type;
    let title = this.props.title;
    return (
      <div>
        {text && length > 0?
            <div>
            <h6>{title}</h6>
            {this.getLink(textArray)}
          </div>
          :""
        }
       </div> 
    )
  }
}
