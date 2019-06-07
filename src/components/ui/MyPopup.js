import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Popup from "reactjs-popup";

class MyPopup extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open,
    }
    this.closeModal = this.closeModal.bind(this);
    
  }

  componentDidMount(){
    this.setState({"open": this.props.open});
  }

  componentWillReceiveProps(props){
    this.setState({"open": props.open});
  }

  resetPopup(){
    this.setState({});
    this.closeModal(); 
  }

  openModal (){
    this.setState({"open": true});
  }

  closeModal = () => {
    this.setState({"open": false}, function(){
      if (this.props.onClose)
         this.props.onClose();
    });
  }

  render() { 
    let isEditable = true;
    let open = this.state.open;
    let content = this.props.content || 'Popup Content'
    return (
    <div>
              <Popup 
               //position="center"  
                open={open}
                closeOnDocumentClick
                onClose={this.props.onClose ? this.props.onClose: this.closeModal}
                >
                    <a className="close" onClick={this.
                      closeModal}>&times;</a>
                    <div className="card-body">
                        {content}
                    </div>
              </Popup>
  </div>
    );
  }
}

export default (MyPopup);