import React, { Component } from 'react'
import classNames from 'classnames/bind';
import Helper from "../../shared/custom";

export default class InfoYesNo extends Component {
  render() {
    let text = undefined;
    if(this.props.text){
      text = this.props.text === true ? "Yes" : "No";
    }
    let title = this.props.title;
    return (
      <div  className={classNames(!Helper.isEmpty(this.props.additionalClassName)?this.props.additionalClassName:'')}>
        {text?
            <div>
            {title?<h6>{title}</h6>:""}
            <div>{text}</div>
            </div>
            :
            ""
        }
        </div> 
    )
  }
}
