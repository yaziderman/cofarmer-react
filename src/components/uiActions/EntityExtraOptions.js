import React, { Component } from "react";
import Helper from "../../shared/custom";
import { withRouter } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import ClaimPopup from "../uiActions/ClaimPopup";

class EntityExtraOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ClaimPopupOpen: false,
      localProps: {}
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ ClaimPopupOpen: true });
  }
  closeModal = () => {
    this.setState({ ClaimPopupOpen: false });
  };

  closeDropDown() {
    let elem = document.getElementsByClassName("dropdown-menu-right");
    if (!Helper.isEmpty(elem)) {
      for (var i = 0; i < elem.length; i++) {
        elem[i].classList.remove("show");
      }
    }
  }

  contextualMenu = () => {
    let objectType = this.props.objectType;

    switch (objectType) {
      case "company":
        return (
          <React.Fragment>
            <div
              className="dropdown-menu dropdown-menu-right mailbox ddMailbox"
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="message-center">
                <a
                  className="dropdown-item text-blue-"
                  href="javascript:void(0)"
                  onClick={this.props.handleEnableClaimBanner}
                >
                  <div className="dpIcon m-r-5">
                    <i className="fas fa-lock-open" />
                  </div>
                  <div className="mail-contnet dd-content">
                    <h5 className="font-medium font-14 text-blue-">
                      Claim Ownership
                    </h5>
                    <span className="mail-desc font-I-10 text-blue-">
                      Request Admin Access to this page
                    </span>
                  </div>
                </a>
              </div>
            </div>
            {/* <ClaimPopup
              open={this.state.ClaimPopupOpen}
              onClose={this.closeModal}
              pageType={objectType}
              uri={this.props.uri}
            /> */}
          </React.Fragment>
        );
      case "user":
        return (
          <React.Fragment>
            <div
              className="dropdown-menu dropdown-menu-right mailbox ddMailbox"
              aria-labelledby="dropdownMenuButton1"
            >
              <div className="message-center">
                <a
                  className="dropdown-item text-blue-"
                  href={"/user-details/" + this.props.uri}
                >
                  <div className="dpIcon m-r-5">
                    <i className="fas fa-link" />
                  </div>
                  <div className="mail-contnet dd-content">
                    <h5 className="font-medium font-14 text-blue-">
                      Edit Profile
                    </h5>
                    <span className="mail-desc font-I-10 text-blue-">
                      You may edit your details.
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </React.Fragment>
        );

      case "event":
      return (
        <React.Fragment>
          <div
            className="dropdown-menu dropdown-menu-right mailbox ddMailbox"
            aria-labelledby="dropdownMenuButton1"
          >
            <div className="message-center">
              <a
                className="dropdown-item text-blue-"
                href={"/event-details/" + this.props.uri}
              >
                <div className="dpIcon m-r-5">
                  <i className="fas fa-link" />
                </div>
                <div className="mail-contnet dd-content">
                  <h5 className="font-medium font-14 text-blue-">Edit Event</h5>
                  <span className="mail-desc font-I-10 text-blue-">
                    You may edit the event details.
                  </span>
                </div>
              </a>
            </div>
          </div>
        </React.Fragment>
      );
      case "opportunity":
      return (
        <React.Fragment>
          <div
            className="dropdown-menu dropdown-menu-right mailbox ddMailbox"
            aria-labelledby="dropdownMenuButton1"
          >
            <div className="message-center">
              <a
                className="dropdown-item text-blue-"
                href={"/opportunity-details/" + this.props.uri}
              >
                <div className="dpIcon m-r-5">
                  <i className="fas fa-link" />
                </div>
                <div className="mail-contnet dd-content">
                  <h5 className="font-medium font-14 text-blue-">
                    Edit Opportunity
                  </h5>
                  <span className="mail-desc font-I-10 text-blue-">
                    You may edit the opportunity details.
                  </span>
                </div>
              </a>
            </div>
          </div>
      </React.Fragment>
      );
      default:
        console.log("Sorry, we are out of " + ".");
    }
  };

  render() {
    let loading = this.state.loading;
    return (
      <div>
        <LoadingOverlay>
          <Loader fullPage loading={loading} />
        </LoadingOverlay>

        <div className="dropdown">
          <a
            className="text-muted dropdown-toggle newsDropdown"
            id="dropdownMenuButton1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-h text-default" />
          </a>
          {this.contextualMenu()}
        </div>
      </div>
    );
  }
}

export default withRouter(EntityExtraOptions);
