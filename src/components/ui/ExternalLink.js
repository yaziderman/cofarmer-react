import React, { Component } from 'react'

export default class ExternalLink extends Component {
  render() {
    let link = this.props.link;
    let text = this.props.text || link;
    let title = this.props.title;

    if(link){
      if((link+"").substring(0,4) !="http"){
        link = "http://"+link;
      }
    }
    return (
      <div>
        {link && title?
            <h6>{title}</h6>
            :
            ""
        }
        {link?
            <a href={link} rel="nofollow,noreferrer" target="_blank">{text}</a>              
            :
            ""
        }
      </div> 
    )
  }
}
