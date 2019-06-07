import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import Helper from "../../shared/custom";
import config from "../../shared/config";
import classNames from 'classnames/bind';

export default class EditDate extends Component {

  render() {
    let title = this.props.title;
    let name = this.props.name;
    let value = this.props.value;
    let required = this.props.required || false;
    let readOnly = this.props.readOnly || false;
    let placeholder = this.props.placeholder;
    let onValueChange = this.props.onValueChange;
    let format = (!Helper.isEmpty(this.props.isDateTime) && (this.props.isDateTime == true)) ?'MMMM d, yyyy HH:mm':config.displayDateFormat;
    let addClass = (!Helper.isEmpty(this.props.isDateTime) && (this.props.isDateTime == true)) ?'fullWidth':'';

    
    return (
      <div className="date-minimal-width">
          <div className="col-lg-12 p-0 float-left">
              <h5>{title}</h5>
              <div className="col-md-12 p-0">
                  <div className={classNames('ediableInline', {'': (!Helper.isEmpty(this.props.isDateTime) && (this.props.isDateTime == true))})}>
                      <DatePicker className="form-control"
                          selected={value}
                          onChange={onValueChange.bind(this)}
                          placeholderText={placeholder}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          required={required}
                          readOnly={readOnly}
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat={format}
                          // dropdownMode="select"
                      />
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
