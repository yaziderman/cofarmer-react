import React, { Component } from 'react';
import Helper from '../../shared/custom';
import config from '../../shared/config';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class DeletePage extends Component {

    constructor(props){
        super(props);
        this.state ={
            type:null,
            uri:null
        }

        this.deleteDetail = this.deleteDetail.bind(this);
        this.proceed = this.proceed.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if(!Helper.isEmpty(this.props)){
            this.setState({
                type:this.props.type.toLowerCase(),
                uri:this.props.uri,
            });
            let parent;
            let type = this.props.type.toLowerCase();
            if(!Helper.isEmpty(this.props.parent)){
                parent = this.props.parent
            }else if(type == "company"){
                parent="companies"
            }
            else if(type == "opportunity"){
                parent="opportunities"
            }
            else if(type == "event"){
                parent="events"
            }
            this.setState({
                parent:parent
            })
        }
    }
    componentWillReceiveProps(props){
        this.setState({
            uri:props.uri,
        });
    }

    proceed(){
           this.deleteDetail()
    }
    cancel(){
          return false;
    }

    deleteDetail(){
        let uri = this.state.uri;
        let type = this.state.type;
        let parent = this.state.parent;
        
        if(Helper.isEmpty(uri) || uri=="new"){
            //Helper.pushTError("NOT_DELETABLE_ITEM");
            this.props.history.push('/'+parent)
            return false;
        }

        let url = null;
        if(type == "opportunity"){
            url = "opportunity?opportunityId="+uri
        }else{
            url = type+"/"+uri+"/delete"
        }
        
        Axios.delete(
            Helper.apiURL({
                uri:url
            })
        )
        .then( (response) => { 
            Helper.pushTSuccess("ITEM_DELETED");
            this.props.history.push('/'+parent)
        })
        .catch((err) => {
            Helper.pushTError("NOT_DELETABLE_ITEM");
        });

    }

  render() {
    let type = this.props.type;
    let action = {
        proceed:this.proceed,
        cancel:this.cancel
    }

    return (
      <div className="float-left">
         <button className="btn btn-danger waves-effect- waves-light- m-r-10" onClick={event => Helper.actionConfirm(event,action)}>Delete {type}</button>
      </div>
    )
  }
}



export default withRouter(DeletePage);