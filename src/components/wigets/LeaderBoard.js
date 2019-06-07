import React, { Component } from 'react';
import config from '../../shared/config';
import { withRouter, Link } from 'react-router-dom';
import Axios from 'axios';
import Helper from "../../shared/custom";

class LeaderBoard extends Component {

    constructor(props){
        super(props);
        this.state ={
            allCompanies:[],
            privateCompany:[],
            publicCompany:[],
            startup:[]

        }
        this.fetchTrendingCompanies = this.fetchTrendingCompanies.bind(this);
    }

    componentDidMount(){
        this.fetchTrendingCompanies()
    }


    fetchTrendingCompanies(){
        Axios.get(
            Helper.apiURL({
                uri:"companies/trending",
            })
        )
        .then( (response) => {     
               
            let companies = response.data && response.data.result ? response.data.result : [];
            this.setState({
                allCompanies:companies.all,
                privateCompany:companies.privateComps,
                publicCompany:companies.publicComps,
                startup:companies.startupComps
            })
        })
        .catch((err) => {
          console.log(err)
        });
    }
    
  render() {
    let companies = this.state.allCompanies;  
    let allCompanies =this.state.allCompanies;
    let privateCompany = this.state.privateCompany;
    let publicCompany =  this.state.publicCompany;
    let startup =  this.state.startup;

    return (
      <div>
          <div className="card">
          <div className="card-header text-left light-blue-header">
                <h5 className="m-b-0 m-t-0 text-white">Top Companies</h5>
              </div>
            <div className="card-body">
                    <ul className="nav nav-pills  inner-div nav-justified  m-b-15 full-width">
                        <li className="nav-item">
                                <a href="#all" className="nav-link active float-left" data-toggle="tab">All</a> 
                        </li>
                        <li className="nav-item">
                                <a href="#private" className="nav-link float-left" data-toggle="tab">Private</a>
                        </li>
                        <li className="nav-item"> 
                            <a href="#public" className="nav-link float-left" data-toggle="tab">Public</a>
                        </li>
                        <li className="nav-item"> 
                            <a href="#startup" className="nav-link float-left" data-toggle="tab">Startups</a>
                        </li>
                    </ul>
                    <div className="tab-content text-left tab-side custom-tab-side clearfix">
                            <div id="all" className="tab-pane fade in active show">
                            <ul className="list-group list-group-full">
                                {!Helper.isEmpty(allCompanies) ?
                                    allCompanies.slice(0, 6).map((data,i)=>(
                                        <li className="list-group-item" key={"all"+i}>
                                                <Link to={"/company/"+data.page.uri}>
                                                <img src={data.page && data.page.image ? Helper.dataPath( data.page.image) : Helper.dataPath(config.defaultCompanyImage)} className="img-circle pull-left m-r-5  float-left" width="35" />
                                                    <span className="font-normal v-a">{data.page.name ? data.page.name : ""}</span>
                                                </Link>
                                            <span className="float-right hidden">
                                                    <span className="font-bold">93</span>
                                                    <span className="font-12 text-megna font-medium"> +3</span>
                                            </span>
                                        </li>
                                    ))
                                    :
                                    <li className="list-group-item text-center">
                                           No Data Available
                                    </li>

                                }
                                
                            </ul> 
                            </div>
                            <div id="private" className="tab-pane fade in">
                            <ul className="list-group list-group-full">
                                {!Helper.isEmpty(privateCompany) ?
                                    privateCompany.map((data,i)=>(
                                        <li className="list-group-item"  key={"private"+i}>
                                                <Link to={"/company/"+data.page.uri}>
                                                <img src={data.page && data.page.image ? Helper.dataPath( data.page.image) : Helper.dataPath(config.defaultCompanyImage)} className="img-circle pull-left m-r-5  float-left" width="35" />
                                                    <span className="font-normal v-a">{data.page.name ? data.page.name : ""}</span>
                                                </Link>
                                            <span className="float-right hidden">
                                                    <span className="font-bold">93</span>
                                                    <span className="font-12 text-megna font-medium"> +3</span>
                                            </span>
                                        </li>
                                    ))
                                    :
                                    <li className="list-group-item text-center">
                                           No Data Available
                                    </li>

                                }
                                
                            </ul> 
                            </div>
                            <div id="public" className="tab-pane fade in ">
                            <ul className="list-group list-group-full">
                                {!Helper.isEmpty(publicCompany) ?
                                    publicCompany.map((data,i)=>(
                                        <li className="list-group-item" key={"public"+i}>
                                                <Link to={"/company/"+data.page.uri}>
                                                <img src={data.page && data.page.image ? Helper.dataPath( data.page.image) : Helper.dataPath(config.defaultCompanyImage)} className="img-circle pull-left m-r-5  float-left" width="35" />
                                                    <span className="font-normal v-a">{data.page.name ? data.page.name : ""}</span>
                                                </Link>
                                            <span className="float-right hidden">
                                                    <span className="font-bold">93</span>
                                                    <span className="font-12 text-megna font-medium"> +3</span>
                                            </span>
                                        </li>
                                    ))
                                    :
                                    <li className="list-group-item text-center">
                                           No Data Available
                                    </li>

                                }
                                
                            </ul> 
                            </div>
                            <div id="startup" className="tab-pane fade in">
                            <ul className="list-group list-group-full">
                                {!Helper.isEmpty(startup) ?
                                    startup.map((data,i)=>(
                                        <li className="list-group-item" key={"startup"+i}>
                                                <Link to={"/company/"+data.page.uri}>
                                                    <img src={data.page && data.page.image ? Helper.dataPath( data.page.image) : Helper.dataPath(config.defaultCompanyImage)} className="img-circle pull-left m-r-5  float-left" width="35" />
                                                    <span className="font-normal v-a">{data.page.name ? data.page.name : ""}</span>
                                                </Link>
                                            <span className="float-right hidden">
                                                    <span className="font-bold">93</span>
                                                    <span className="font-12 text-megna font-medium"> +3</span>
                                            </span>
                                        </li>
                                    ))
                                    :
                                    <li className="list-group-item text-center">
                                           No Data Available
                                    </li>

                                }
                                
                            </ul> 
                            </div>
                    </div>
            </div>
            <div className="col-md-12 text-right m-t-10">
                <Link to="/companies">View All Companies</Link>
            </div>
          </div>
        
      </div>
    )
  }
}


export default withRouter(LeaderBoard);