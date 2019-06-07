import React, { Component } from "react";
import Helper from "../../shared/custom";
import Sidemenu from "../sidemenu/Sidemenu";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import config from "../../shared/config";
import { LoadingOverlay, Loader } from "react-overlay-loader";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      loading: false,
      processed_area:0
    };
  }

  componentDidMount() {
    this.fetchProcesses();
  }

  fetchProcesses = () => {
    this.setState({
      loading: true
    });
    Axios.get(config.api("report"))
      .then(response => {
        console.log("response", response);
        let res = response.data;
        this.setState({
          processes: res.records,
          processed_area: res.processed_area,
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



  render() {
    let { processes, processed_area } = this.state;
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
              <div className="col-lg-12 clearfix">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-left">Processes Report</h4>
                    <div className="table-responsive">
                      <table className="table color-bordered-table muted-bordered-table">
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>Tractor</th>
                            <th>Area</th>
                            <th>Planned Date</th>
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
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <p>
                      The total of the processed area is: <span>{processed_area}</span>
                    </p>

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

export default withRouter(Report);
