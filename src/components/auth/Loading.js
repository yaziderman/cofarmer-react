import React, { Component } from 'react';
import config from '../../shared/config';
import Helper from '../../shared/custom';

export default class Loading extends Component {
   constructor(props){
       super(props)
   } 
   componentDidMount(){
      let referal = localStorage.getItem("referal");
      let redirectTo = (Helper.isEmpty(referal))?"/":referal;
      setTimeout(()=>{
            localStorage.removeItem("referal");
            this.props.history.push(redirectTo);
      },3000)
   }
  render() {
    return (
      <div>
         <div className="row">
            <div className="col-12 verticle-cente-m">
                <div className="text-center">
                    <img src={config.cdn +'theme/images/loader.gif'} /> 
                    <h1>We’re creating your personalized homepage</h1>
                    <h2>Please wait a few moments while we 
                        get things ready for you</h2>
                </div>     
            </div>
        </div>
      </div>
    )
  }
}
