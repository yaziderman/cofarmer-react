import React, { Component } from 'react'

export default class SectorList extends Component {
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
                    <span key={"CISCT"+item.sector.id}>{index > 0 ?", ":""}{item.sector.name}</span>
                  ))}
            </div>
          :
          ""
          }
        </div>
    )
  }
}