import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helper from '../../shared/custom';
import store from '../../store';
import Select from 'react-select';
import { globalSearch } from "../../actions/searchAction";



class MetaFields extends Component {
    constructor(props){
        super(props);
        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
        this.state = {
            showEdit:false,
            
            metaList:{},
            metaSublist:[],
            activeMetas:[],
            allChecked:false,

            metaKey:null,
            metaTitle:null,
            metaCriteria:null,

            currentMetaList:[],
            defaultList:[],
            noOfDefaultItems:2,
            selectedFieldBox:[],
            searchCriteriaInStore:{},  
        }
        
        store.subscribe(() => { 
            var storeState = store.getState();  
            var storeMetaList = storeState.meta.metaList
            var metaKey = this.state.metaKey;
            
            if(!metaKey){
                return false;
            }
            var currentMetaListInStore = storeMetaList[metaKey];
            var currentMetaList = this.state.currentMetaList;
            var defaultList = [];

            if(JSON.stringify(storeState.search.searchCriteria) !=  JSON.stringify(this.state.searchCriteriaInStore)){
                this.setState({
                    searchCriteriaInStore:storeState.search.searchCriteria
                })
            }
            
            if(JSON.stringify(currentMetaList) !=  JSON.stringify(currentMetaListInStore)){
                if(!currentMetaListInStore || currentMetaListInStore.length == 0){
                    this.setState({
                        currentMetaList:[],
                        defaultList:[]
                    })
                }else{
                    defaultList = currentMetaListInStore.slice(0,this.state.noOfDefaultItems);
                    this.setState({
                        currentMetaList:currentMetaListInStore,
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
        let metaListInStore = storeState.meta.metaList;
        let metaKey = this.props.metaKey;
        
        let currentMetaList = [];
        
        if(metaListInStore[metaKey]){
            currentMetaList = metaListInStore[metaKey];
        }

        this.setState({
            metaList:metaListInStore,
            metaKey:this.props.metaKey,
            metaTitle:this.props.metaTitle,
            metaCriteria:this.props.metaCriteria,
            currentMetaList:currentMetaList
        })
  
    }
    componentWillReceiveProps(props){
        var storeState = store.getState();         
        let metaListInStore = storeState.meta.metaList;
        let metaKey = props.metaKey;
        
        let currentMetaList = [];
        
        if(metaListInStore[metaKey]){
            currentMetaList = metaListInStore[metaKey];
        }

        this.setState({
            metaList:metaListInStore,
            metaKey:props.metaKey,
            metaTitle:props.metaTitle,
            metaCriteria:props.metaCriteria,
            currentMetaList:currentMetaList
        })
    }

    handleCheckboxData(event){
        this.handleDropdown(event);       
    }

    selectAll(event){
        if(event.target.checked){
            this.setState({
                activeMetas:[],
                selectedFieldBox:[],
                allChecked:true
            },()=>{
                this.handleSearch(this.state.activeMetas)
            })
        }
    }

    handleDropdown(event){
        
        var selectedVal = event.value;
        var activeMetas = this.state.activeMetas;
        selectedVal = selectedVal+"";
        if(activeMetas.indexOf(selectedVal) == -1){
            activeMetas.push(selectedVal);
            this.setState({activeMetas:activeMetas,allChecked:false});
        }
        
        this.handleSearch(activeMetas)
       
    }

    handleSelectedOptions(event){
        var activeMetas = this.state.activeMetas;
        var selectedValue = event.target.value;
        if(event.target.checked){
            if(activeMetas.indexOf(selectedValue) == -1){
                activeMetas.push(selectedValue)
            }
        }else{
            if(activeMetas.indexOf(selectedValue) == -1){
                activeMetas.push(selectedValue)
            }else{
                Helper.removeValue(activeMetas,selectedValue)
            }

        }
        this.setState({
            activeMetas:activeMetas,            
            allChecked:false,
        })
        this.handleSearch(activeMetas);
        
    }

   handleSearch(activeMetas){
        var criteria = this.state.searchCriteriaInStore;
        criteria[this.state.metaCriteria] = activeMetas.join(',');
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
     let currentMetaList =   this.state.currentMetaList;

     var activeMetas = this.state.activeMetas;
     let options = [];
     currentMetaList.forEach(function(item,index ){
         var data = {}
            data.value = item.id;
            data.label = item.name;
            options.push(data)
     });


    

     return (
      <div>
          { !Helper.isEmpty(currentMetaList) ?
            <div className="text-left m-t-20 demo-checkbox">
                <h5 className="m-b-10">{this.state.metaTitle}</h5>
                <li>
                    <input type="checkbox" id={'all'+this.state.metaKey} value="" className="filled-in chk-col-blue" checked={this.state.allChecked} onChange={this.selectAll.bind(this)} />
                    <label htmlFor={'all'+this.state.metaKey}>All {this.state.metaTitle}</label>
                </li>

                {currentMetaList
                    .map((list, index) => (
                        (index < this.state.noOfDefaultItems || activeMetas.indexOf(list.id+"") > -1)?
                            <li key={index}>
                                <input type="checkbox" id={'id'+list.id}  value={list.id} className="filled-in chk-col-blue selectFilter"  checked={(activeMetas.length >= 1) && (activeMetas.indexOf(list.id+"") > -1) ? true : false} onChange={this.handleSelectedOptions.bind(this)}/>
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
                            {/* <i className="fa fa-plus float-left"></i> */}
                            <span className="float-left addSearch pre-by-plus">Choose {this.state.metaTitle}</span>
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
export default  connect(mapStateToProps,{globalSearch})(withRouter(MetaFields));