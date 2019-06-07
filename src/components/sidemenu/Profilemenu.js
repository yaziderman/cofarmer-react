import React, { Component } from 'react'
import Helper from "../../shared/custom";
import store from "../../store";
import $ from  'jquery';
import Helpers from '../../shared/custom';

export default class Profilemenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      overview: null,
      page: null,
      entityUri: null,
      startup: null,
      loading: true
    };

    store.subscribe(() => {
      var storeState = store.getState();
      var entityState = storeState.entity || null;
      var company = entityState ? entityState.company : null;
      if (!company) {
        return;
      }
      if (company.entityUri == this.state.entityUri) {
        return;
      }

      this.setState({
        overview: company.entityInfo.company,
        page: company.entityInfo.page,
        entityUri: company.entityUri,
        startup: company.entityInfo.startup,
        auth: storeState.auth
      });

    });
  }

  componentDidMount(){
    var offset = 80;
    var $root = $('html, body');
    $('.nav-side li a').click(function(event) {
        console.log("event")
        event.preventDefault();
        var href = $.attr(this, 'href');
        
        $('.nav-side li a').removeClass('active')
        $(this).addClass('active')
        if(!Helpers.isEmpty($(href).offset())){
            $root.animate({
                scrollTop: $(href).offset().top - (offset)
            }, 500, function () {
            });
        }
        
    });
  }


  render() {
    var page = this.state.page;
    var overview = this.state.overview;
    let pageTypes = page && page.pageTypes?page.pageTypes:[];
    let companyType = overview && overview.companyType?overview.companyType:null;
    
    let isStartup = Helper.isStartupCompany(pageTypes);
    return (
      <div>
        <ul className="nav nav-pills nav-side nav-stacked list-style-none components profileMenu">

                        <li>
                            <a className={"nav-link-- inv-nav-link"} href="#summary"> 
                                Summary
                            </a>
                        </li>
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#classification"> 
                            Classification
                            </a>
                        </li>
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#overview"> 
                                Overview
                            </a>
                        </li> 
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#financial"> 
                              Financial
                            </a>
                        </li> 
                        {isStartup? (
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#startup"> 
                            Startup Details
                            </a>
                        </li>
                        ):""}

                        <li>
                            <a className="nav-link-- inv-nav-link" href="#contact"> 
                            Contact
                            </a>
                        </li>
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#founders"> 
                            Founders
                            </a>
                        </li>
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#team"> 
                              Team Members
                            </a>
                        </li>
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#bod"> 
                              Board of Directors
                            </a>
                        </li>
                        
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#funding"> 
                              Funding
                            </a>
                        </li>

                        <li>
                            <a className="nav-link-- inv-nav-link" href="#investors"> 
                              Investors
                            </a>
                        </li>
                        {!isStartup? (
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#investments"> 
                              Investments
                            </a>
                        </li>
                          ):""}
                         {
                           //page && page.acquisitions? (
                            !isStartup?(
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#acq"> 
                                  Acquisitions
                            </a>
                        </li>
                        ):""}

                        {Helper.isPublicCompany(companyType)? (
                        <li>
                            <a className="nav-link-- inv-nav-link" href="#ipo"> 
                            IPO Details
                            </a>
                        </li>
                        ):""}

                        <li>
                            <a className="nav-link-- inv-nav-link" href="#events"> 
                              Events
                            </a>
                        </li>
                    
         </ul>
      </div>
    )
  }
}
