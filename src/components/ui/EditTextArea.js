import React, { Component } from 'react'
import classNames from 'classnames/bind';
import Helper from "../../shared/custom";

export default class EditTextArea extends Component {

  render() {
    let title = this.props.title;
    let name = this.props.name;
    let value = this.props.value;
    let placeholder = this.props.placeholder;
    let onValueChange = this.props.onValueChange;
    let maxlength = this.props.maxlength;
    
    return (
      <div className={classNames(!Helper.isEmpty(this.props.additionalClassName)?this.props.additionalClassName:'')}>
          <div className="col-lg-12 p-0 float-left">
                <h5>{title}</h5>
                <div className="col-md-12 p-0">
                  <textarea className="form-control textarea-lg" name={name} row="10" value={value} placeholder={placeholder} onChange={onValueChange} maxLength={maxlength ? maxlength :""} ></textarea>
                </div>
          </div>
      </div>
    )
  }
}
