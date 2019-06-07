import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link ,Switch ,withRouter} from "react-router-dom";

class BatchList extends Component {

  constructor(props){
    super(props);
    this.getContent = this.getContent.bind(this);
  }

  getContent(type,item,extraClass){
    switch(type){
      case "sectors":
        return  <div  key={item.sector.id} className="float-left l-h-j"><Link to={"/companies/sector/"+item.sector.id}  className={"label-rounded text-white batch-label font-14 yellow-bg "+extraClass} key={"SEC"+item.id}>{item.sector.name}</Link></div>
      case "industries":
         return  <div  key={item.industry.id} className="float-left l-h-j"><Link to={"/companies/industry/"+item.industry.id}  className={"label-rounded font-14 text-white batch-label yellow-bg "+extraClass} key={"IND"+item.industry.id}>{item.industry.name}</Link></div>
      case "categories" :
         return <div  key={item.id} className="float-left l-h-j"> <Link to={"/companies/tag/"+item.id}  className={"label-rounded font-14 text-white batch-label yellow-bg "+extraClass} key={"TAG"+item.id}>{item.name}</Link></div>
    }

  }
  render() {
    let title = this.props.title;
    let itemList = this.props.items;
    let extraClass = this.props.extraClass? this.props.extraClass :"";
    let type = this.props.type;

    return (
        <div className="clearfix"  key={title}>
          {title && itemList?
            <h6 className="m-t-5">{title}</h6>
            :
            ""
          }
          {itemList?
            <div>
                {itemList.map((item, index) => (
                   this.getContent(type,item,extraClass)
                ))}
            </div>
          :
          ""
          }
        </div>
    )
  }
}

export default  withRouter(BatchList);