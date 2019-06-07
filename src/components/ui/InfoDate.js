import React, { Component } from 'react'
import Helper from "../../shared/custom";
import config from "../../shared/config";

export default class InfoDate extends Component {
  render() {
    let date = this.props.date;
    let preText = this.props.preText || "";
    let format = (!Helper.isEmpty(this.props.isDateTime) && (this.props.isDateTime === true)) ?config.displayDateTimeFormat:config.displayDateFormat;
    let addClass = this.props.addClass ? this.props.addClass : "";
    if(!date){
      return (<div></div>);
    }

    date = Helper.getDateInFormat(date,format);
    let title = this.props.title;
    return (
      <div>
        {date?
            <div>
            {
              title ?
              <h6>{title}</h6>
              :
              ""
            }
            
            <div>{preText}<span className={"m-l-5 "+addClass}>{date}</span></div>
            </div>
            :
            ""
        }
        </div> 
    )
  }
}
