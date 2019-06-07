import React, { Component } from 'react';
import Helpers from '../../shared/custom';

export default class SocialCard extends Component {
  render() {
    let label = this.props.label;
    let value = this.props.value;
    let type = this.props.type;
    let btn = "btn-"+type;
    let icon = "fa fa-"+type;
    
    return (
        <div className="clearfix">
            <div>
                <a href={!Helpers.isEmpty(value) ? Helpers.properExternalUrl(value) : "javascript:void(0)"} target="_blank" className={"btn waves-effect waves-light "+btn}> <i className={"fab fa-"+type}></i> </a>
                {!Helpers.isEmpty(value) ?
                    <a href={!Helpers.isEmpty(value) ? Helpers.properExternalUrl(value)  : "javascript:void(0)"} target="_blank"><span className="font-16 font-medium m-l-10">{label}</span></a>
                    :
                    <span className={"font-16 font-medium disabled m-l-10"}>{label}</span>
                }
            </div>
         </div>
    )
  }
}
