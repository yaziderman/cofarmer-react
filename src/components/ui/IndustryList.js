import React, { Component } from 'react'

export default class IndustryList extends Component {
  render() {
    let title = this.props.title;
    let itemList = this.props.items;
    return (
        <div>
          {title && itemList?
            <h6>{title}</h6>
            :
            ""
          }
          {itemList?
            <div>
                {itemList.map((item, index) => (
                    <span key={"CIIND"+item.industry.id}>{index > 0 ?", ":""}{item.industry.name}</span>
                  ))}
            </div>
          :
          ""
          }
        </div>
    )
  }
}