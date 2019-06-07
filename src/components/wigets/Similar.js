import React, { Component } from 'react';
import BoxSlider from "./BoxSlider"; 
import Axios from 'axios';
import Helper from "../../shared/custom";

class Similar extends Component {
    constructor(props){
        super(props);
        this.state ={
            similar:[],
            scrollItems:1
        }
        this.fetchSimilar = this.fetchSimilar.bind(this);
    }

    componentDidMount(){
        let uri = this.props.uri;
        this.fetchSimilar(uri);
    }

    fetchSimilar(uri){
        Axios.get(
            Helper.apiURL({
                uri:uri+"/similar",
            })
        )
        .then( (response) => {     
            let similar = response.data && response.data.result ? response.data.result : [];
            this.setState({
                similar:similar
            })
        })
        .catch((err) => {
          console.log(err)
        });
    }

  render() {
    let similar = this.state.similar;
    let type  = this.props.type;
    let title = this.props.title;
    let uri = this.props.uri;
    let scrollItems = this.state.scrollItems;
    return (
      <div>
          <BoxSlider items={scrollItems} title={title} type={type} dataset={similar} uri={uri} key={uri}/>
      </div>
    )
  }
}
export default  Similar;