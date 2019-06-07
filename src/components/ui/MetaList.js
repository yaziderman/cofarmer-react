import React, { Component } from 'react'

export default class MetaList extends Component {
  render() {
    let title = this.props.title;
    let metaList = this.props.metaList;
    return (
        <div>
          {title && metaList?
            <h6>{title}</h6>
            :
            ""
          }
          {metaList?
            <div>
                {metaList.map((meta, index) => (
                    <span key={meta.id}>{index > 0 ?", ":""}{meta.name}</span>
                  ))}
            </div>
          :
          ""
          }
        </div>
    )
  }
}