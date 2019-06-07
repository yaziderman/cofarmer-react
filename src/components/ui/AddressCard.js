import React, { Component } from 'react'
import Helpers from '../../shared/custom';

export default class AddressCard extends Component {

    constructor(props){
        super(props);
        this.getContent = this.getContent.bind(this);
    }
  
    getContent(type){
        let value = this.props.value;
        switch(type){
            case "address" :
              return <div>
                        <span className="clearfix font-16">{value.country ? value.country.name : ""}</span>
                        <span className="clearfix font-16">{value.city ? value.city.name : ""}</span>
                        <span className="clearfix font-16">{value.addressLine1 ? value.addressLine1 : ""}</span>
                        <span className="clearfix font-16">{value.addressLine2 ? value.addressLine2 : ""}</span>
                        <span className="clearfix font-16">{value.stateOrProvince ? value.stateOrProvince  :""}</span>
                        <span className="clearfix font-16">{value.poBox ? "PO Box: "+value.poBox  :""}</span>
                     </div>
            case "map":
               return <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.8936590467906!2d54.33704850943708!3d24.454474507742223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65f97f568c7f%3A0xbfe63c9419958157!2sAlgorythma!5e0!3m2!1sen!2sae!4v1552403957429" width="100%" height="100%" frameborder="0" allowFullScreen></iframe>
            
        }
    }

    render() {
        let label = this.props.label;
        let value = this.props.value;
        let type = this.props.type;
        return (
            <div className="col-md-4 col-sm-12 float-left p-1">
                <div className="col-12 mini-card float-left">
                    <div className="font-bold float-left font-16">{label}</div>
                    <div className="clearfix font-14 font-medium">{this.getContent(type)}</div>
                </div>
            </div>
        )
      }
}
