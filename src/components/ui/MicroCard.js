import React, { Component } from 'react'
import Helpers from '../../shared/custom';

export default class MicroCard extends Component {
  constructor(props){
      super(props);
      this.getContent = this.getContent.bind(this);
  }

  getContent(type){
      let value = this.props.value;
      let link = this.props.link == false ? undefined : true;
      switch(type){

        case "web":   
            let newValue = Array.isArray(value) ? value : [value]; 
            return newValue.map((data,i)=>(
              link ? <a href={!Helpers.isEmpty(data) ? Helpers.properExternalUrl(data) : "javascript:void(0)"}   className="font-16" target="_blank"  key={"web"+i}>{Helpers.domainOnly(data)}</a> :<span className="font-16" key={"web"+i}>{Helpers.domainOnly(data)}{i == (newValue.length-1) ? ' ' : ', '}</span>
            ))
          case "email":          
            return value.map((data,i)=>(
                (link) ? 
                  <a href={"mailto:"+data} className="font-16 nowrap-line" key={"email"+i}>{data}{i == (value.length-1) ? ' ' : <br />}</a> 
                :
                  <span className="font-16 nowrap-line" key={"email"+i}>{data}{i == (value.length-1) ? ' ' : <br />}</span>
                
            ))
          case "phone":
             return value.map((data,i)=>(
                link ? 
                <a href={"tel:"+data} className="font-16" key={"tel"+i}>{data}{i == (value.length-1) ? ' ' : ', '}</a>
                :
                <span className="font-16" key={"tel"+i}>{data}{i == (value.length-1) ? ' ' : ', '}</span>
            ))
          default:
              return <span className="font-16">{value}</span>
          
      }
  }


  render() {
    let label = this.props.label;
    let value = this.props.value;
    let type = this.props.type;
    return (
        <div className="col-md-4 col-sm-12 float-left p-1">
            <div className="col-12 mini-card float-left">
                <span className="font-bold float-left font-16">{label}</span>
                <span className="float-right text-rigth font-10 font-medium wide-right-child">{this.getContent(type)}</span>
            </div>
        </div>
    )
  }
}
