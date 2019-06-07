import React, { Component } from 'react';
import Helpers from '../../shared/custom';
import config from '../../shared/config';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


export default class TypeAHead extends Component {

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
    return (
      <div>
         <h5>{title}</h5>
         <div className="col-6 p-0">
         <AsyncTypeahead
           minLength={1}
           {...this.state}
           labelKey="login"
           placeholder="Type to search"
           onSearch={this._handleSearch}
           onChange={this._onChange}
           renderMenuItemChildren={(option, props) => (
              <div key={option.id} user={option} >
                  <img src={option.avatar_url}  className="img-circle pull-left m-r-20 m-b-10 float-left" width="30" />
                  <div>
                      <h6 className="font-bold  m-t-5">{option.login} <span className="text-default font-10 font-normal"></span></h6> 
                  </div>
              </div>
          )}
        
        />
         </div>
      </div>
    )
  }

  _onChange(e){
    
  }

  _handleSearch = (query) => {
    this.setState({isLoading: true});
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        isLoading: false,
        options: json.items,
      }));
  }


}
