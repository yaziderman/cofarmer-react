import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import restoreAuth  from './utils/restoreAuth';
import Approuter from './utils/Approuter';
import $ from 'jquery';
// import MainRouter from './utils/MainRouter';
import Navbar  from './components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import PublicHomePage from './components/homepage/PublicHomepage';
import 'react-overlay-loader/styles.css';
import ReactGA from 'react-ga';
import Helpers from './shared/custom';
ReactGA.pageview(window.location.pathname + window.location.search);
require('dotenv').config()


restoreAuth();
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      view :"default",
      isLoading : true,
      isLoggedIn:false,
      enableNav:false,
      popupStatus:false,
    }
    store.subscribe(()=>{
         var storeState = store.getState();  
         this.setState({
          isLoggedIn: storeState.auth.isAuthenticated
        }) 
    });
  } 


  componentDidMount() {
     
     this.setState({isLoading: false});
     var storeState = store.getState(); 
     this.setState({
       isLoggedIn:storeState.auth.isAuthenticated
     })


    // setTimeout(()=>{
    //   $('.dataTable').DataTable({searching: false, info: false, });
    //   console.log("in")
    // },2000)
  
  }

  render() {    
    let isLoggedIn = this.state.isLoggedIn;
    let popupStatus = this.state.popupStatus;
    return (
      <Provider store={store}>
        <Router>
          <div className="App container-fluid custom-container" id="main-wrapper">
           {  this.state.isLoading ? 
                "loading" : 
                <div>
                    <ToastContainer />
                       {!isLoggedIn &&  window.location.pathname === "/" ? 
                        <Approuter/>
                       :
                        <div>
                          <Navbar/> 
                          <Approuter/>
                        </div>
                      }
                      
                </div>              
           }            
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;