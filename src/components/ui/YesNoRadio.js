import React, { Component } from 'react'

export default class YesNoRadio extends Component {
  constructor(props){
      super(props);
  }
  render() {
    return (   
        <div className={this.props.additionalClassName?this.props.additionalClassName:''}>
          <div className="col-lg-12 p-0 float-left">
            {this.props.title?<h5>{this.props.title}</h5>:""}
            <div className={"demo-radio-button "}>
                <div className="float-left col-2 p-0">
                    <input name={this.props.name} type="radio" id={"radio-yes-"+this.props.name} className="with-gap radio-col-blue" value={true} defaultChecked={this.props.default} onChange={this.props.onChange} />
                    <label htmlFor={"radio-yes-"+this.props.name} className="l-h-0">Yes</label>
                </div>
                <div className="float-left col-1 p-0">
                    <input name={this.props.name} type="radio" id={"radio-no-"+this.props.name} className="with-gap radio-col-blue" value={false} defaultChecked={!this.props.default} onChange={this.props.onChange} />
                    <label htmlFor={"radio-no-"+this.props.name} className="l-h-0">No</label>
                </div>
            </div> 
          </div> 
        </div>
    )
  }
}
