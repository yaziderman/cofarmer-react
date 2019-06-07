import React, { Component } from 'react'
import Helper from "../../shared/custom";
import store from "../../store";
import $ from  'jquery';
import Helpers from '../../shared/custom';

export default class ProfileCreatemenu extends Component {
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
    var lastPageState = this.props.lastPageState;
    let companyType = lastPageState && lastPageState.type ?lastPageState.type.name:null;
    let isStartup = companyType.toUpperCase() == "STARTUP" ? true : false;

    return (
      <div>
        <ul className="nav nav-pills nav-side nav-stacked list-style-none components profileMenu">
                <li>
                    <a className="nav-link" href="#overview"> 
                        Overview
                    </a>
                </li>
                {isStartup? (
                <li>
                    <a className="nav-link" href="#startup"> 
                    Startup Details
                    </a>
                </li>
                ):""}
                <li>
                    <a className="nav-link" href="#contact"> 
                    Contact
                    </a>
                </li>
                {Helper.isPublicCompany(companyType)? (
                <li>
                    <a className="nav-link" href="#ipo"> 
                    IPO Details
                    </a>
                </li>
                ):""}
                    
         </ul>
      </div>
    )
  }
}
