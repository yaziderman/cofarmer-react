import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom';
import Defaultmenu from './Defaultmenu';

export class Sidemenu extends Component {
   constructor(props){
        super(props)
        this.state = {
            view :"default",
            context:undefined,
            filterDates:{},
            query:undefined

        }
        
} 
componentWillReceiveProps(props){
    // this.setState({
    //     context:props.context,
    // },()=>{
    // })

    // if(JSON.stringify(this.props) != JSON.stringify(props) ){
    //     this.setState({
    //         view:this.props.mode
    //     })
    // }
}

componentDidMount(){
    // this.setState({
    //     view:this.props.mode
    // })
} 

  render() {
    let view  = this.state.view;
    let sideMenu = <Defaultmenu />
    let absolutedMenu = view == "search" ?  "fix-sidebar" : "";
    
    return (
        <Router>
         <div className="left-sidebar sticky-nav nav lefted  m-t-80">
            <div className="scroll-sidebar ">
                <nav className="sidebar-nav">
                   <div className={"left-aside "+absolutedMenu}>
                        <div className="sideMenuBg">
                            {sideMenu}
                            <br className="clearFix" />
                        </div>                         
                    </div>
                </nav>
            </div>
        </div> 
      </Router>      
    )
  }
}

export default withRouter(Sidemenu)
