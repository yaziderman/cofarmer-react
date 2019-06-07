import React, { Component } from 'react';
import config from '../../shared/config';
export default class Loader extends Component {
  render() {
    return (
      <div>
         <div className="card bold-headers">
             <div className="card-body">
               <img alt="" src={config.cdn +'theme/images/small-loader.gif'}  />
             </div>
          </div>
      </div>
    )
  }
}
