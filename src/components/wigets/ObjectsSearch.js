import React, { Component } from 'react';
import Helpers from '../../shared/custom';
import Axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class ObjectsSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      allowNew: props.allowNew && props.allowNew === true? true : false,
      multiple: props.multiple && props.multiple === true? true : false,
      isLoading: false,
      options: []
    }
    this._handleSearch = this._handleSearch.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    
    let title = this.props.title;
    let headingClass = this.props.headingClass? this.props.headingClass : "";
    let defaultSelected = this.props.defaultSelected;
 
    return (
      <div className="col-lg-12 p-0 float-left">
         {!Helpers.isEmpty(title) ? <h5 className={headingClass}>{title}</h5> : ""}
         <div className={!Helpers.isEmpty(this.props.inputClassName)?this.props.inputClassName:"col-12 p-0 "}>
         <AsyncTypeahead
          newSelectionPrefix="Add a new item: "
          minLength={1}
          {...this.state}
          labelKey="name"
          defaultSelected={defaultSelected}
          placeholder="Type to search"
          onSearch={this._handleSearch}
          onChange={this._onChange}
          renderMenuItemChildren={(option, props) => (
              <div key={"obj-"+option.value} user={option} >
                  <div>
                      <h6 className="font-bold  m-t-5">{option.name} 
                      </h6> 
                  </div>
              </div>
          )}
        
        />
         </div>
      </div>
    )
  }

  _onChange(e){
    this.props.onChange(e);
  }

  _handleSearch = (query) => {
    this.setState({isLoading: true});
    
    let endPoint = this.props.endPoint?this.props.endPoint:"title";

    Axios.get(
        Helpers.apiURL({
          uri:endPoint,
          query:{query:query}
        })
      )
      .then((response) => {
         let objects = response.data.result;
         let objectsOptions = [];
          let option = { 
            name: undefined,
            shortName: undefined,
            value:null,
            image:null
          };

          objects.forEach(obj => {          
              
          objectsOptions.push(
                  {
                    name: obj.name,
                    shortName: obj.shortName,
                    value:obj.id
                  }
                )             

          });
        this.setState({
          isLoading: false,
          options: objectsOptions,
        })
        // return false;
      })
      .catch((err) => {
        this.setState({
          isLoading: false 
        })
      })
      
  }


}