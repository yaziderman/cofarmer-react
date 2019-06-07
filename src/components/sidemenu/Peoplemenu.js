import React, { Component } from 'react';
import $ from 'jquery';
import Helpers from '../../shared/custom';


export default class Peoplemenu extends Component {
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
                            <a className="nav-link" href="#overview"> 
                                Overview
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#career"> 
                             Career History
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#investment"> 
                            Investments
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#education"> 
                             Education  History
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#events"> 
                             Events
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#news"> 
                             Related News
                            </a>
                        </li>
                    
         </ul>
      </div>
    )
  }
}
