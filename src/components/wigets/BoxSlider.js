import React, { Component } from "react";
export default class BoxSlider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items = this.props.items ? this.props.items : this.state.items;
    let title = this.props.title;
    let type = this.props.type;
    let sectionId = this.props.id;
    let dataset = this.props.dataset;
    let uri = this.props.uri;

    return (
      <div>
          <div className="card" id={sectionId}>
          <div className="card-header text-left light-blue-header">
                  <h5 className="m-b-0 m-t-0 text-white">{title}</h5>
            </div>
            <div className="card-body">
              
          </div>
        </div>
      </div>
    );
  }
}
