import React, { Component } from 'react';
import Helpers from '../../shared/custom';
import config from '../../shared/config';
import Axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


export default class IndividualSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
    }
    this._handleSearch = this._handleSearch.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  render() {
    let title = this.props.title;
    let headingClass = this.props.headingClass? this.props.headingClass : "";
    return (
      <div>
         <h5 className={headingClass}>{title}</h5>
         <div className="col-12 p-0">
         <AsyncTypeahead
           minLength={1}
          {...this.state}
          labelKey="name"
          placeholder="Type to search"
          onSearch={this._handleSearch}
          onChange={this._onChange}
          renderMenuItemChildren={(option, props) => (
              <div key={"People"+option.uniqueId} user={option} >
                  <img src={option.image}  className="img-circle pull-left m-r-20 m-b-10 float-left" width="30" />
                  <div>
                      <h6 className="font-bold  m-t-5">{option.name} 
                      <br />
                      <span className="text-default font-10 font-normal">{option.title}</span>
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
    
    Axios.get(
        Helpers.apiURL({
          uri:"individual/list",
          query:{search:query}
        })
      )
      .then((response) => {
        

        let people = response.data.result;
        let peopleOptions = [];
        let option = { 
          uniqueId:undefined,
          name: undefined,
          title: null
        };

        people.forEach(person => {          
          let image = Helpers.dataPath(config.defaultUserImage);          
          
          if(person.titles){
            person.titles.forEach(entry => {
              let title= entry.title ? entry.title.name : ""; 
              title+= entry.company? " at "+entry.company.name : "";
              
              peopleOptions.push(
                {
                  uniqueId:person.uniqueId,
                  name: person.name,
                  image: image,
                  title: title
                }
              )             
            })
          }

        });
        this.setState({
          isLoading: false,
          options: peopleOptions,
        })
        return false;
      })
      .catch((err) => {

      })
      
  }


}
