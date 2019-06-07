import React, { Component } from "react";
import Helper from "../../shared/custom";
import Sidemenu from "../sidemenu/Sidemenu";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import config from "../../shared/config";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import DatePicker from "react-datepicker";
import Select from "react-select";

class AddEditField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: undefined,
      area: 0,
      field: null,
      tractor: null,
      fieldOptions: [],
      tractorOptions: [],
      planned_date: new Date()
    };
  }

  componentDidMount() {
    let location = window.location.pathname;
    let id = Helper.lastSegment(location);
    this.populateFields();
    this.populateTractors();
    if (id != "new") {
      this.setState({
        id: id
      });
      this.populateForm(id);
    }
  }

  populateFields = () => {
    this.setState({
        loading: true
      });
      Axios.get(config.api("fields"))
        .then(response => {
          this.setState({
            fieldOptions: Helper.makeSelectOptions(response.data),
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
  }

  
  populateTractors = () => {
    this.setState({
        loading: true
      });
      Axios.get(config.api("tractors"))
        .then(response => {
          this.setState({
            tractorOptions: Helper.makeSelectOptions(response.data),
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
  }

  handleTractorChange = option => {
    this.setState({tractor: option});
 }
 handleFieldChange = option => {
    this.setState({field: option});
 }

  onChangeFields = event => {
    if (event.target.name == "enabled") {
      this.setState({ [event.target.name]: event.target.checked });
    } else if (event.target.name == "currency") {
      this.setState({ [event.target.name]: { id: event.target.value } });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  submit = e => {
    e.preventDefault();
    let state = this.state;

    if (Helper.isEmpty(state.area) || Helper.isEmpty(state.field) || Helper.isEmpty(state.tractor)) {
      Helper.pushTError("All fields are mandatory");
      return false;
    }
    this.saveProcess(state);
  };

  saveProcess = state => {
    this.setState({
      loading: true
    });

    let {field, tractor, area, planned_date} = this.state;

    let payload = {};
    payload.tractor_id = tractor.value;
    payload.field_id = field.value;
    payload.area = area;
    payload.planned_date = Helper.getDateInInputFormat(planned_date);
    
    if (Helper.isEmpty(this.state.id)) {

      Axios.post(config.api("processes"), payload)
        .then(response => {
          Helper.pushTSuccess("Created Succesfully");
          this.props.history.push("/processes");
          this.setState({
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
    } else {
      Axios.put(config.api("processes/" + this.state.id), payload)
        .then(response => {
          Helper.pushTSuccess("Updated Succesfully");
          this.props.history.push("/processes");
          this.setState({
            loading: false
          });
        })
        .catch(err => {
          console.log("err", err.response.data);
       
          if (err.response.data && err.response.data.data)
              Helper.pushTError(err.response.data.data);
          else if (err.response.data && err.response.data.message)
              Helper.pushTError(err.response.data.message);
          else
              Helper.pushTError("There is an issue in the server , Please try again later");

          this.setState({
            loading: false
          });
        });
    }
  };

  handlePlannedDateChange = date => {
    this.setState({
         planned_ate: date
    });
}

  populateForm = id => {
    if (!Helper.isEmpty(id)) {
      Axios.get(
        Helper.apiURL({
          uri: "processes/:processId",
          pathVar: { processId: id }
        })
      )
        .then(response => {
          let data = response.data;
          this.setState({
            field: Helper.makeSelectOption(data.field),
            tractor: Helper.makeSelectOption(data.tractor),
            planned_date: data.planned_date,
            area: data.area
          });
        })
        .catch(err => {
          if (err.response.data && err.response.data.data)
              Helper.pushTError(err.response.data.data);
          else
              Helper.pushTError("There is an issue in the server , Please try again later");

        });
    }
  };

  render() {
    let loading = this.state.loading;
    let {
      area,
      field,
      tractor,
      fieldOptions,
      tractorOptions,
      planned_date
    } = this.state;
    return (
      <div className="container-fluid">
        <LoadingOverlay>
          <Loader fullPage loading={loading} />
        </LoadingOverlay>
        <div className="row content-in m-t-80 p-t-10">
          <Sidemenu />
          <div className="col-lg-2 col-xlg-2 col-md-3 searchMenu sideMenuCont" />
          <div className="col-lg-10 col-xlg-10 col-md-9 addSubscription">
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-outline-info">
                  <div className="card-header">
                    <h4 className="m-b-0 text-white text-left">Add Field</h4>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="row p-t-20">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Field</label>
                            <Select
                              name="field"
                              value={field}
                              className="font-14 col-md-12 p-0 m-0"
                              options={fieldOptions}
                              onChange={this.handleFieldChange.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Industry</label>
                            <Select
                              name="tractor"
                              value={tractor}
                              className="font-14 col-md-12 p-0 m-0"
                              options={tractorOptions}
                              onChange={this.handleTractorChange.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Area</label>
                            <input
                              type="number"
                              id="area"
                              name="area"
                              className="form-control"
                              placeholder="Enter Area"
                              value={area}
                              onChange={this.onChangeFields}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">Date & Time</label>
                            <div>
                              <DatePicker
                                className="form-control"
                                selected={planned_date}
                                onChange={this.handlePlannedDateChange}
                                dateFormat="yyyy-dd-MM"
                                placeholderText="Enter a Start Date for the process"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-offset-3 col-md-12">
                          <button
                            onClick={this.submit}
                            className="btn btn-info float-right"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
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

export default withRouter(AddEditField);
