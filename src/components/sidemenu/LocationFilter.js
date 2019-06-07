import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import store from '../../store';
import Select from 'react-select';
import { globalSearch } from "../../actions/searchAction";
import countries from "../../shared/country";
import areas from '../../shared/areas';


class LocationFilter extends Component {
    constructor(props){
        super(props);
        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
        this.state = {
            showEdit:false,
            locations:[],
            activeLocations:[],
            allChecked:false,

            filterKey:null,
            filterTitle:null,
            filterCriteria:null,    

            noOfDefaultItems:2,
            searchCriteriaInStore:{},  
        }
        
        store.subscribe(() => { 
            var storeState = store.getState();
            var filterKey = this.state.filterKey;
            
            if(!filterKey){
                return false;
            }

            if(JSON.stringify(storeState.search.searchCriteria) !=  JSON.stringify(this.state.searchCriteriaInStore)){
                this.setState({
                    searchCriteriaInStore:storeState.search.searchCriteria
                })
            }

        }); 

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCheckboxData = this.handleCheckboxData.bind(this); 
        this.handleSelectedOptions = this.handleSelectedOptions.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
       
    }

    componentDidMount(){
        this.setState({
            filterKey:this.props.filterKey,
            filterTitle:this.props.filterTitle,
            filterCriteria:this.props.filterCriteria,
        })
    }

    handleCheckboxData(event){
        this.handleDropdown(event);       
    }

    selectAll(event){
        if(event.target.checked){
            this.setState({
                activeLocations:[],
                allChecked:true,
            },()=>{
                this.handleSearch(this.state.activeLocations)
                if(this.props.onSelectLocation){
                    this.props.onSelectLocation(this.state.activeLocations);
                }
            })
        }
       
    }

    handleDropdown(event){
        var selectedVal = event.value;
        var activeLocations = this.state.activeLocations;
        selectedVal = selectedVal+"";
        if(activeLocations.indexOf(selectedVal) == -1){
            activeLocations.push(selectedVal);
            this.setState({activeLocations:activeLocations,allChecked:false});
        }
        this.handleSearch(activeLocations);
        if(this.props.onSelectLocation){
            this.props.onSelectLocation(activeLocations);
        }
    }

    handleSelectedOptions(event){
        var activeLocations = this.state.activeLocations;
        var selectedValue = event.target.value;
        
        if(event.target.checked){
            if(activeLocations.indexOf(selectedValue) == -1){
                activeLocations.push(selectedValue)
            }
        }else{
            if(activeLocations.indexOf(selectedValue) == -1){
                activeLocations.push(selectedValue)
            }else{
                Helper.removeValue(activeLocations,selectedValue)
            }

        }
        this.setState({
            activeLocations:activeLocations,
            allChecked:false
        })

        this.handleSearch(activeLocations);

        if(this.props.onSelectLocation){
            this.props.onSelectLocation(activeLocations);
        }

    }

   handleSearch(activeLocations){
        var criteria = this.state.searchCriteriaInStore;
        criteria[this.state.filterCriteria] = activeLocations.join(',');
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
     var countryList = this.props.type == "area" ? areas : countries;
     var activeLocations = this.state.activeLocations;
     let options =[];
     countryList.forEach(function(item,index){
        var data = {}
        data.value = item.id;
        data.label = item.name;
        options.push(data);
     });
     
     return (
      <div>
          { !Helper.isEmpty(countryList) ?
            <div className="text-left m-t-20 demo-checkbox">
                            <h5 className="m-b-10">{this.state.filterTitle}</h5>
                            <li>
                                <input type="checkbox" id={'all'+this.props.filterCriteria} value="" className="filled-in chk-col-blue" checked={this.state.allChecked == true ? true : false} onChange={this.selectAll.bind(this)} />
                                <label htmlFor={'all'+this.props.filterCriteria}>All {this.state.filterTitle}</label>
                            </li>

                            {countryList
                                .map((list, index) => (
                                    (index < this.state.noOfDefaultItems || activeLocations.indexOf(list.id+"") > -1)?
                                        <li key={index}>
                                            <input type="checkbox" id={this.props.filterCriteria+list.id}  value={list.id} className="filled-in chk-col-blue selectFilter"  checked={(activeLocations.length >= 1) && (activeLocations.indexOf(list.id+"") > -1) ? true : false} onChange={this.handleSelectedOptions.bind(this)}/>
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
                            <hr className=""/>
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
export default  connect(mapStateToProps,{globalSearch})(withRouter(LocationFilter));