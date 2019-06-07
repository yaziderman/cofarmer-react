import React, { Component } from 'react';
import { render } from 'react-dom';
import { LoadingOverlay, Loader } from 'react-overlay-loader';



export default class OverlayLoader extends Component {
  state = { loading: false }
  render() {
    const { loading } = this.state;
    return (
        <div style={{ height: '100vh', backgroundColor: 'lavender', padding: 16 }}>
        <LoadingOverlay style={{ width: 200, height: 200, backgroundColor: 'papayawhip' }}> 
            <h2 style={{ margin: 16}}> Some content</h2>
            <Loader loading={loading}/>
        </LoadingOverlay>
        
        <button onClick={() => this.setState({ loading: !loading })}>
          Toggle loader
        </button>
          
 
        <div style={{ width: 200, height: 200, backgroundColor: 'goldenrod' }}> 
            <h2 style={{ margin: 16}}>Other Content</h2>
        </div>
 
      </div>
    )
  }
}
