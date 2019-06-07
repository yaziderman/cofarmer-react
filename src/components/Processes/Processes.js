import React, { Component } from "react";
import Helper from "../../shared/custom";
import Sidemenu from "../sidemenu/Sidemenu";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import config from "../../shared/config";
import { LoadingOverlay, Loader } from "react-overlay-loader";

class Processes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      loading: false
    };
  }

  componentDidMount() {
    this.fetchProcesses();
  }

  fetchProcesses = () => {
    this.setState({
      loading: true
    });
    Axios.get(config.api("processes"))
      .then(response => {
        this.setState({
          processes: response.data,
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data && err.response.data.data)
            Helper.pushTError(err.response.data.data);
        else
            Helper.pushTError("There is an issue in the server , Please try again later");

        this.setState({
          loading: false
        });
      });
  };

  proceed = e => {
    let id = e.attributes.getNamedItem("data-id").value;
    if (!Helper.isEmpty(id)) {
      let url = "processes/" + id;
      this.setState({
        loading: true
      });
      Axios.delete(
        Helper.apiURL({
          uri: url
        })
      )
        .then(response => {
          Helper.pushTSuccess("ITEM_DELETED");
          this.setState({
            loading: false
          });
          let newData = this.state.processes;
          newData = newData.filter(data => {
            return data.id != id;
          });
          this.setState({
            processes: newData
          });
        })
        .catch(err => {
          Helper.pushTError("NOT_DELETABLE_ITEM");
          this.setState({
            loading: false
          });
        });
    }
  };

  stopPop = e => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  render() {
    let { processes } = this.state;
    let action = {
      proceed: this.proceed,
      cancel: this.cancel
    };
    let loading = this.state.loading;
    return (
      <div className="container-fluid">
        <LoadingOverlay>
          <Loader fullPage loading={loading} />
        </LoadingOverlay>
        <div className="row content-in m-t-80 p-t-10">
          <Sidemenu />
          <div className="col-lg-2 col-xlg-2 col-md-3 searchMenu sideMenuCont" />
          <div className="col-lg-10 col-xlg-10 col-md-9">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group m-b-0">
                  <Link
                    to={"/process/new"}
                    className="btn btn-info waves-effect waves-light m-t-10 float-right"
                  >
                    Add Process
                  </Link>
                </div>
              </div>
              <div className="col-lg-12 clearfix">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-left">Manage Processes</h4>
                    <div className="table-responsive">
                      <table className="table color-bordered-table muted-bordered-table">
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>Tractor</th>
                            <th>Area</th>
                            <th>Planned Date</th>
                            <th>Approved</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Helper.isEmpty(processes) ? (
                            <tr>
                              <td colSpan="10">No Data Found</td>
                            </tr>
                          ) : (
                            processes.map((data, index) => (
                              <tr key={index}>
                                <td>{data.field ? data.field.name : ""}</td>
                                <td>{data.tractor ? data.tractor.name : ""}</td>
                                <td>{data.area ? data.area : ""}</td>
                                <td>{data.planned_date ? data.planned_date : ""}</td>
                                <td>{data.approved ? "Yes" : "No"}</td>
                                <td>
                                  <Link to={"/process/" + data.id}>
                                    <i className="fa fa-pencil-square-o font-14" />
                                  </Link>{" "}
                                  &nbsp;
                                  <a
                                    href="javascript:void(0)"
                                    data-id={data.id}
                                    onClick={event =>
                                      Helper.actionConfirm(event, action)
                                    }
                                  >
                                    <i className="fa fa-trash font-14" />
                                  </a>
                                  {/* onBlur={Helper.dismissActionConfirm} */}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Processes);
