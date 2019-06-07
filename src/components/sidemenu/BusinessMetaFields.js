import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import store from '../../store';
import Select from 'react-select';
import { globalSearch } from "../../actions/searchAction";



class BusinessMetaFields extends Component {
    constructor(props){
        super(props);
        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
        this.state = {
            showEdit:false,
            
            dataList:{},
            dataSublist:[],
            activeData:[],
            allChecked:false,

            businessKey:null,
            businessTitle:null,
            businessCriteria:null,

            currentDataList:[],
            defaultList:[],
            noOfDefaultItems:2,
            selectedFieldBox:[],
            searchCriteriaInStore:{},  
        }
        
        store.subscribe(() => { 
            var storeState = store.getState();  
            var storeDataList = storeState.business.data
            var businessKey = this.state.businessKey;
            
            if(!businessKey){
                return false;
            }
            
            var currentDataListInStore = storeDataList[businessKey];
            var currentDataList = this.state.currentDataList;
            var defaultList = [];

            if(JSON.stringify(storeState.search.searchCriteria) !=  JSON.stringify(this.state.searchCriteriaInStore)){
                this.setState({
                    searchCriteriaInStore:storeState.search.searchCriteria
                })
            }
            
            if(JSON.stringify(currentDataList) !=  JSON.stringify(currentDataListInStore)){
                if(!currentDataListInStore || currentDataListInStore.length == 0){
                    this.setState({
                        currentDataList:[],
                        defaultList:[]
                    })
                }else{
                    defaultList = currentDataListInStore.slice(0,this.state.noOfDefaultItems);
                    this.setState({
                        currentDataList:currentDataListInStore,
                        defaultList:defaultList
                    });
                }

            }
                 
        }); 

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCheckboxData = this.handleCheckboxData.bind(this); 
        this.handleSelectedOptions = this.handleSelectedOptions.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
       
    }

    componentDidMount(){

        var storeState = store.getState();         
        let dataListInStore = storeState.business.data;
        let businessKey = this.props.businessKey;
        let currentDataList = [];
        
        if(dataListInStore[businessKey]){
            currentDataList = dataListInStore[businessKey];
        }

        this.setState({
            dataList:dataListInStore,
            businessKey:this.props.businessKey,
            businessTitle:this.props.businessTitle,
            businessCriteria:this.props.businessCriteria,
            currentDataList:currentDataList
        })
    }
    handleCheckboxData(event){
        this.handleDropdown(event);       
    }

    selectAll(event){
        if(event.target.checked){
            this.setState({
                activeData:[],
                selectedFieldBox:[],
                allChecked:true,
            },()=>{
                this.handleSearch(this.state.activeData)
            })
        }
    }

    handleDropdown(event){
        
        var selectedVal = event.value;
        var activeData = this.state.activeData;
        selectedVal = selectedVal+"";
        if(activeData.indexOf(selectedVal) == -1){
            activeData.push(selectedVal);
            this.setState({activeData:activeData});
        }
        
        this.handleSearch(activeData)
       
    }

    handleSelectedOptions(event){
        var activeData = this.state.activeData;
        var selectedValue = event.target.value;
        if(event.target.checked){
            if(activeData.indexOf(selectedValue) == -1){
                activeData.push(selectedValue)
            }
        }else{
            if(activeData.indexOf(selectedValue) == -1){
                activeData.push(selectedValue)
            }else{
                Helper.removeValue(activeData,selectedValue)
            }

        }
        this.setState({
            activeData:activeData,
            allChecked:false
        });

        this.handleSearch(activeData);
        
    }

   handleSearch(activeData){
        var criteria = this.state.searchCriteriaInStore;
        criteria[this.state.businessCriteria] = activeData.join(',');
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
     let currentDataList =   this.state.currentDataList;
     var activeData = this.state.activeData;
     let options = [];
     currentDataList.forEach(function(item,index ){
         var data = {}
            data.value = item.id;
            data.label = item.name;
            options.push(data)
     });

     return (
      <div>
          { !Helper.isEmpty(currentDataList) ?
            <div className="text-left m-t-20 demo-checkbox">
                            <h5 className="m-b-10">{this.state.businessTitle}</h5>
                            <li>
                                <input type="checkbox" id={'all'+this.state.businessKey} value="" className="filled-in chk-col-blue" onChange={this.selectAll.bind(this)}  checked={this.state.allChecked == true ? true : false} />
                                <label htmlFor={'all'+this.state.businessKey}>All {this.state.businessTitle}</label>
                            </li>

                            {currentDataList
                                .map((list, index) => (
                                    (index < this.state.noOfDefaultItems || activeData.indexOf(list.id+"") > -1)?
                                        <li key={index}>
                                            <input type="checkbox" id={'id'+list.id}  value={list.id} className="filled-in chk-col-blue selectFilter"  checked={(activeData.length >= 1) && (activeData.indexOf(list.id+"") > -1) ? true : false} onChange={this.handleSelectedOptions.bind(this)}/>
                                            <label htmlFor={'id'+list.id}>{list.name}</label>
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
                                        <span className="float-left addSearch">Choose {this.state.businessTitle}</span>
                                </a> }
                            </li>
                            <hr />
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
export default  connect(mapStateToProps,{globalSearch})(withRouter(BusinessMetaFields));