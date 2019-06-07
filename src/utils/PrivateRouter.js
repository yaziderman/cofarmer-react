import React, { Component } from 'react';
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouter  =({component :Component,auth,...rest }) =>(
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
              />
  )} />


    

)

// const mapStateToProps_ = () =>{
//   console.log(state);
// };
const mapStateToProps = state =>({
  auth:state.auth
});

export default connect(mapStateToProps,null)(PrivateRouter);