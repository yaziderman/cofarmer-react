import React, { Component } from 'react';
import Helper from '../../shared/custom';
import Sidemenu from '../sidemenu/Sidemenu';
import { withRouter, Redirect ,Link} from 'react-router-dom';
import Axios from 'axios';
import config from '../../shared/config';
import { LoadingOverlay, Loader } from 'react-overlay-loader';




class AddEditField extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            id:undefined,
            area:0,
            crops_type:"",
            name:""
        }
        this.onChangeFields = this.onChangeFields.bind(this);
        this.editSubscription = this.editSubscription.bind(this);
    }

    componentDidMount(){
        let location = window.location.pathname;
        let id = Helper.lastSegment(location);
        if(id != "new"){
            this.setState({
                id:id
            })
            this.populateForm(id);
        }
        
    }

    onChangeFields(event){
        if(event.target.name == "enabled"){
            this.setState({[event.target.name]:event.target.checked});
        }else if(event.target.name == "currency"){
            this.setState({[event.target.name]:{"id":event.target.value}});
        }else{
            this.setState({[event.target.name]:event.target.value});
        }
        
    }
    

    submit = e => {
        e.preventDefault();
        let state = this.state;
        if(Helper.isEmpty(state.name)){
            Helper.pushTError("All fields are mandatory");
            return false;
        }
        this.saveField(state);
    }

    saveField = state => {
        this.setState({
            loading:true
        })

        if(Helper.isEmpty(this.state.id)){

            Axios.post(
                config.api("fields"),
                state)
            .then( (response) => {
                Helper.pushTSuccess("Created Succesfully");
                this.props.history.push("/fields");
                this.setState({
                    loading:false
                })
            })
            .catch((err) => {
                if (err.response.data && err.response.data.data)
                    Helper.pushTError(err.response.data.data);
                else
                    Helper.pushTError("There is an issue in the server , Please try again later");
                this.setState({
                        loading:false
                })
            });
        }else{

            Axios.put(
                config.api("fields/"+this.state.id),
                state)
            .then( (response) => {
                Helper.pushTSuccess("Updated Succesfully");
                this.props.history.push("/fields");
                this.setState({
                    loading:false
                })
            })
            .catch((err) => {
                if (err.response.data && err.response.data.data)
                    Helper.pushTError(err.response.data.data);
                else
                    Helper.pushTError("There is an issue in the server , Please try again later");
                this.setState({
                    loading:false
                })
            });

        }
    
        

    }

    populateForm = id => {
        if(!Helper.isEmpty(id)){
           Axios.get(
            Helper.apiURL({
                uri:"fields/:fieldId",
                pathVar:{ fieldId:id},
               
            })
            )
        .then( (response) => {
           let data = response.data;
           this.setState({
               name:data.name,
               crops_type:data.crops_type,
               area:data.area
           })
        })
        .catch((err) => {
            if (err.response.data && err.response.data.data)
                Helper.pushTError(err.response.data.data);
            else
                Helper.pushTError("There is an issue in the server , Please try again later");
        
        });
        }
    }

    editSubscription(id){
       
    }

  render() {

    let loading = this.state.loading;
    let { area , crops_type , name } = this.state;
    return (
        <div className="container-fluid">
        <LoadingOverlay>
             <Loader fullPage loading={loading}/>
        </LoadingOverlay>
        <div className="row content-in m-t-80 p-t-10">
             <Sidemenu />
            <div className="col-lg-2 col-xlg-2 col-md-3 searchMenu sideMenuCont">
            </div>
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
                                                    <label className="control-label">Name</label>
                                                    <input type="text" id="name" name="name" className="form-control" placeholder="Enter Name" defaultValue={name} onChange={this.onChangeFields} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="control-label">Area</label>
                                                    <input type="number" id="area" name="area" className="form-control" placeholder="Enter Area" defaultValue={area} value={area} onChange={this.onChangeFields} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="control-label">Crop Type</label>
                                                    <input type="text" id="crops_type" name="crops_type" className="form-control" placeholder="Enter Crop Type" defaultValue={crops_type} onChange={this.onChangeFields} />
                                                </div>
                                            </div>
                                            
                                      </div>
                                      <hr/>
                                      <div className="row">
                                            <div className="col-md-offset-3 col-md-12">
                                                <button  onClick={this.submit} className="btn btn-info float-right">Submit</button>
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
    )
  }
}

export default withRouter(AddEditField);
