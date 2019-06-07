import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";

class MyPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  resetPopup() {
    this.setState({});
    this.closeModal();
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    let isEditable = true;
    return (
      <div>
        <Popup
          position="center"
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <a className="close" onClick={this.closeModal}>
            &times;
          </a>
          <div className="card-body">Popup Body</div>
        </Popup>
      </div>
    );
  }
}

export default withRouter(MyPopup);
