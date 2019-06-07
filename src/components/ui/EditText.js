import React, { Component } from 'react'

export default class EditText extends Component {

  render() {
    let title = this.props.title;
    let name = this.props.name;
    let value = this.props.value ? this.props.value : undefined;
    let placeholder = this.props.placeholder;
    let onValueChange = this.props.onValueChange;
    let inputType = this.props.inputType || "text";
    let addClass = this.props.addClass ? this.props.addClass : "ediableInline";
    
    return (
      <React.Fragment>
          <div className="col-lg-12 p-0 float-left">
              { title ?  <h5>{title}</h5> : <span className="m-t-5">&nbsp;</span>}
                <div className="col-md-12 p-0">
                  <input type={inputType} className={"form-control "+addClass} name={name} value={value} placeholder={placeholder} onChange={onValueChange}  />
                </div>
          </div>
      </React.Fragment>
    )
  }
}
