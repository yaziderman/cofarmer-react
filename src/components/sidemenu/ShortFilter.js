import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import Axios from 'axios';
import Select from 'react-select';
import { globalSearch } from "../../actions/searchAction";



class ShortFilter extends Component {
    constructor(props){
        super(props);
        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
        this.state = {
            showEdit:false,
            roles:[],
            activeRoles:[],

            filterKey:null,
            filterTitle:null,
            filterCriteria:null,    

            noOfDefaultItems:2,
            searchCriteriaInStore:{},  
        }
        

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCheckboxData = this.handleCheckboxData.bind(this); 
        this.handleSelectedOptions = this.handleSelectedOptions.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.fetchRoles = this.fetchRoles.bind(this);
    }

    componentDidMount(){
        this.setState({
            filterKey:this.props.filterKey,
            filterTitle:this.props.filterTitle,
            filterCriteria:this.props.filterCriteria,
        })

        this.fetchRoles();
    }

    fetchRoles(){
        Axios.get(
            Helper.apiURL({
                uri:"user/roles/list ",
            })
        )
        .then( (response) => {
            let roles  = response.data.result || [];  
            this.setState({
                roles:roles
            })
        })
      }

    handleCheckboxData(event){
        this.handleDropdown(event);       
    }

    selectAll(event){
        if(event.target.checked){
            this.setState({
                activeRoles:[]
            },()=>{
                this.handleSearch(this.state.activeRoles)
                if(this.props.onSelectLocation){
                    this.props.onSelectLocation(this.state.activeRoles);
                }
            })
        }
       
    }

    handleDropdown(event){
        var selectedVal = event.value;
        var activeRoles = this.state.activeRoles;
        selectedVal = selectedVal+"";
        if(activeRoles.indexOf(selectedVal) == -1){
            activeRoles.push(selectedVal);
            this.setState({activeRoles:activeRoles});
        }
        this.handleSearch(activeRoles);
        if(this.props.onSelectLocation){
            this.props.onSelectLocation(activeRoles);
        }
    }

    handleSelectedOptions(event){
        var activeRoles = this.state.activeRoles;
        var selectedValue = event.target.value;
        if(event.target.checked){
            if(activeRoles.indexOf(selectedValue) == -1){
                activeRoles.push(selectedValue)
            }
        }else{
            if(activeRoles.indexOf(selectedValue) == -1){
                activeRoles.push(selectedValue)
            }else{
                Helper.removeValue(activeRoles,selectedValue)
            }

        }
        this.setState({
            activeRoles:activeRoles
        })

        this.handleSearch(activeRoles);

        if(this.props.onSelectLocation){
            this.props.onSelectLocation(activeRoles);
        }

    }

   handleSearch(activeRoles){
        var criteria = this.state.searchCriteriaInStore;
        criteria[this.state.filterCriteria] = activeRoles.join(',');
        this.props.globalSearch(criteria);
   }

    showEdit(event){
        event.preventDefault(); 
        this.setState({ showEdit: true });
    }

    hideEdit(event){
        event.preventDefault(); 
        this.setState({ showEdit: false });
    }

  render() {
     var roleList = this.state.roles;
     var activeRoles = this.state.activeRoles;
     let options =[];
     roleList.forEach(function(item,index){
        var data = {}
        data.value = item.id;
        data.label = item.name;
        options.push(data);
     });
     
     return (
      <div>
          { !Helper.isEmpty(roleList) ?
            <div className="text-left m-t-20 demo-checkbox">
                            <h5 className="m-b-10">{this.state.filterTitle}</h5>
                            <li>
                                <input type="checkbox" id={'all'+this.props.filterCriteria} value="" className="filled-in chk-col-blue" onChange={this.selectAll.bind(this)} />
                                <label htmlFor={'all'+this.props.filterCriteria}>All {this.state.filterTitle}</label>
                            </li>

                            {roleList
                                .map((list, index) => (
                                    (index < this.state.noOfDefaultItems || activeRoles.indexOf(list.id+"") > -1)?
                                        <li key={index}>
                                            <input type="checkbox" id={this.props.filterCriteria+list.id}  value={list.id} className="filled-in chk-col-blue selectFilter"  checked={(activeRoles.length >= 1) && (activeRoles.indexOf(list.id+"") > -1) ? true : false} onChange={this.handleSelectedOptions.bind(this)}/>
                                            <label htmlFor={this.props.filterCriteria+list.id}>{list.name}</label>
                                        </li>
                                    :
                                    ""
                            ))}
                           
                            <li>
                            { this.state.showEdit ? 
                                    <div className="input-group col-md-12 p-0">
                                         <Select className="font-14 col-md-8 p-0 m-0"
                                            onChange={this.handleDropdown.bind(this)}
                                            options={options}
                                        />
                                        <div className="input-group-append closeInputFilter" onClick={this.hideEdit}>
                                            <span className="input-group-text" id="basic-addon2">
                                                <i className="ti-close"></i>
                                            </span>
                                        </div>
                                    </div>
                                     :  
                                        <a href="" onClick={this.showEdit} className="text-info">
                                        <i className="fa fa-plus float-left"></i>
                                        <span className="float-left addSearch">Choose {this.state.filterTitle}</span>
                                </a> }
                            </li>                            
                            <hr className="m-t-30"/>
                        </div>
                      
                        :
                        ""
          }      
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
    searchCriteria:state.searchCriteria,
    errors:state.errors
});
export default  connect(mapStateToProps,{globalSearch})(withRouter(ShortFilter));