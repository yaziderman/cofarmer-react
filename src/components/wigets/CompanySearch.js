import React, { Component } from 'react';
import Helpers from '../../shared/custom';
import config from '../../shared/config';
import Axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


export default class CompanySearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
      query: '',
    }

    this._handleSearch = this._handleSearch.bind(this);
    this._onChange = this._onChange.bind(this);
    this._clearSearchInput = this._clearSearchInput.bind(this);
    this.companySearch = React.createRef();
  }
  componentDidMount(){
    this.setState({
      multiple:this.props.multiple
    });

    if(!Helpers.isEmpty(this.props.clearSearch)){
      this.props.clearSearch(this._clearSearchInput);
    }
    
  }
  render() {

    let title = this.props.title;
    let headingClass = this.props.headingClass? this.props.headingClass : "";
    let defaultSelected = this.props.defaultSelected;
    let selected = this.props.selected;
    let options = this.state.options
 
    return (
      <div>
         {!Helpers.isEmpty(title) ? <h5 className={headingClass}>{title}</h5> : ""}
         <div className="col-12 p-0">
         <AsyncTypeahead
          isLoading = {this.state.isLoading}
          onInputChange={this._handleInputChange}
          minLength={2}
          labelKey="name"
          defaultSelected={defaultSelected}
          ref="companySearch"
          placeholder="Search companies"
          selected={selected}
          onSearch={this._handleSearch}
          onChange={this._onChange}
          multiple= {this.state.multiple}
          clearButton
          options={options}
          renderMenuItemChildren={(option, props) => (
              <div key={"company"+option.uniqueId} user={option} >
                  <img src={option.image}  className="img-circle pull-left m-r-20 m-b-10 float-left" width="30" />
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
  _clearSearchInput(){
    setTimeout(()=>{ 
      this.refs.companySearch.getInstance().clear()
    },0)
  }

  _handleSearch = (query) => {
   // this.setState({isLoading: true});
    Axios.get(
        Helpers.apiURL({
          uri:"search",
          query:{query:query,types:"company"}
        })
      )
      .then((response) => {
        // this.setState({
        //   isLoading: false,
        // })
         let companies = response.data.result;
         let companiesOptions = [];
          companies.forEach(company => {          
              companiesOptions.push(
                  {
                    uniqueId:company.page.uniqueId,
                    name: company.page.name,
                    uri: company.page.uri,
                    value:company.page.uri,
                    image:company.page.image ?  Helpers.dataPath(company.page.image) :  Helpers.dataPath(config.defaultCompanyImage)  
                  }
                )             
          });
          this.setState({
            options: companiesOptions,
          })
       
      })
      .catch((err) => {
        // this.setState({
        //     isLoading: false,
        //   })
      })
      
  }


}
