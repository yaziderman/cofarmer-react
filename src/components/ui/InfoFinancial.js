import React, { Component } from 'react'

export default class InfoFinancial extends Component {
  render() {
    let value = this.props.value;
    let currency = this.props.currency;
    let title = this.props.title;
    return (
      <div>
        {value?
            <div>
            <h6>{title}</h6>
            <div>{value} {currency?currency:""}</div>
            </div>
            :
            ""
        }
        </div> 
    )
  }
}
