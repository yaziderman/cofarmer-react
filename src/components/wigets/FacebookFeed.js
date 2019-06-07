import React, { Component } from 'react'
import config from '../../shared/config';
import { FacebookProvider, Page } from 'react-facebook';
import Helpers from '../../shared/custom';

export default class FacebookFeed extends Component {

    constructor(props){
        super(props);
    }
    render() {

        let facebook = undefined;
        if(!Helpers.isEmpty(this.props.url)){
            facebook = Helpers.lastSegment(this.props.url);
        }

        return (
            <div>
                {facebook?                        
                    <div className="card">
                        <div className="card-body">
                        <FacebookProvider appId={config.facebookAppId}>
                            <Page href={"https://www.facebook.com/"+facebook} tabs="timeline" height="550"/>
                        </FacebookProvider>
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        )
    }
}
