import React, { Component } from 'react';
import $ from 'jquery';
import Helpers from '../../shared/custom';


export default class Oppmenu extends Component {
    constructor(props) {
        super(props);
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
    return (
      <div>
        <ul className="nav nav-pills nav-side nav-stacked list-style-none components profileMenu">
            <li>
                <a className="nav-link" href="#details"> 
                    Basic Details
                </a>
            </li>
            <li>
                <a className="nav-link" href="#description"> 
                Description
                </a>
            </li>
            <li>
                 <a className="nav-link" href="#contact"> 
                    Contact    
                </a>
            </li>
            <li>
                <a className="nav-link" href="#photos"> 
                Photos
                </a>
            </li>
            <li>
                <a className="nav-link" href="#videos"> 
                Videos
                </a>
            </li>
            
            <li>
                 <a className="nav-link" href="#attachment"> 
                     Attachments
                </a>
            </li>
            </ul>
      </div>
    )
  }
}
