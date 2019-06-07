import React, { Component } from "react";
import Select from "react-select";
import classNames from "classnames/bind";
import Helper from "../../shared/custom";

export default class EditSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    console.log("props", this.props);

    let reference = this.props.reference || "";
    let title = this.props.title;
    let placeholder = this.props.placeholder || "Select...";
    let headingClass = this.props.headingClass || "";
    let id = this.props.id || "";

    return (
      <div
        className={classNames(
          !Helper.isEmpty(this.props.additionalClassName)
            ? this.props.additionalClassName
            : ""
        )}
      >
        <div className="col-lg-12 p-0 float-left">
          {title ? <h5 className={headingClass}>{title}</h5> : ""}
          <div>
            <Select
              ref={reference}
              className="font-14 col-md-12 p-0 m-0"
              name={this.props.name}
              options={this.props.options}
              placeholder={placeholder}
              value={this.props.value}
              onChange={this.props.onChange}
              index={this.props.index}
              id={id}
            />
          </div>
        </div>
      </div>
    );
  }
}
