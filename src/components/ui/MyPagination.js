import React, { Component } from 'react'
import config from '../../shared/config';
import Pagination from "react-js-pagination";

export default class MyPagination extends Component {
  render() {

    let activePage = this.props.activePage;
    let totalItemsCount = this.props.totalRecords;
    let onChange = this.props.onChange;

    let itemsCountPerPage = this.props.itemsCountPerPage || config.defaultPageSize;
    let pageRangeDisplayed= this.props.pageRangeDisplayed || config.pageRangeDisplayed;
    let innerClass= this.props.innerClass || "div-pagination float-right";
    //console.log(activePage,totalItemsCount,itemsCountPerPage,pageRangeDisplayed);
    return (
        <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={onChange}
                    innerClass={innerClass}
                  />
    )
  }
}