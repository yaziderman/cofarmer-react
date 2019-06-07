import React, { Component } from 'react'
import classNames from 'classnames/bind';
import Helper from "../../shared/custom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class InfoText extends Component {
  render() {
    let text = this.props.text;
    let title = this.props.title;
    let uri = this.props.uri;
    return (
      <div  className={classNames(!Helper.isEmpty(this.props.additionalClassName)?this.props.additionalClassName:'')}>
        {text?
            <div>
            {title?<h6>{title}</h6>:""}
            <div>{!Helper.isEmpty(uri) ?  <Link to={'/company/'+uri} className="m-l-5">{text}</Link> : text}</div>
            </div>
            :
            ""
        }
        </div> 
    )
  }
}
