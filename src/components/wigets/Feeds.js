import React, { Component } from 'react'
import config from "../../shared/config";
import Helper from '../../shared/custom';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import FeedCards from '../homepage/FeedCards';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import {deletedFeeds} from '../../actions/FeedAction';
import store from '../../store';
import { connect } from 'react-redux';

class Feeds extends Component {
    constructor(props){

        super(props);
        this.state ={
            uri:null,
            type:null,
            posts:[],
            total:0,
            isFetching:false,
            localProps:{},
            mode:null,
            endPoint:undefined,
            companyUri:undefined,
            search: undefined,  
            startDate: undefined,
            endDate: undefined,
            industryIds: undefined,
            sectorIds: undefined,
            reqMode:"slider",
            loading:false,
            localDeletedFeed:null,
            localRemovedBookmarks:null,
            localStore:{},
            isPostAdded:false,
            meta:{
                acqOffset: null,
                compOffset: null,
                eventOffset: null,
                fieldOffset: null,
                newsOffset: null,
                oppOffset: null,
                peopleOffset: null,
                postOffset: null}
        }

         store.subscribe(()=>{
            let storeData = store.getState();
            if(JSON.stringify(this.state.localStore) != JSON.stringify(storeData)){
                this.setState({
                    localStore:storeData
                });
             
                let deletedFeeds = storeData.feedReducer.deletedFeeds;
                if(deletedFeeds != this.state.localDeletedFeed){
                    this.setState({
                        localDeletedFeed:deletedFeeds
                    });
                    let feeds = this.state.posts;
                    if(!Helper.isEmpty(deletedFeeds)){
                        feeds = feeds.filter(function(feed) { 
                            return feed.uniqueId !== deletedFeeds; 
                        });
                        this.setState({
                            posts:feeds
                        });
                    }
                   
                }

                let removedBookmarks = storeData.feedReducer.removedBookmarks;

                if(removedBookmarks != this.state.localRemovedBookmarks && this.state.mode == "bookmarks"){
                    this.setState({
                        localRemovedBookmarks:removedBookmarks
                    });
                    let feeds = this.state.posts;
                    if(!Helper.isEmpty(removedBookmarks)){
                        feeds = feeds.filter(function(feed) { 
                            return feed.uniqueId !== removedBookmarks; 
                        });
                        this.setState({
                            posts:feeds
                        });
                    }
                   
                }
                
            }

        });
                
    }

    componentDidMount(){
        window.addEventListener('scroll', this.loadOnScroll);
        this.setState({
            localProps:this.props,
            uri:this.props.uri,
            type:this.props.type,
            mode:this.props.mode
           
        },()=>{
           // this.loadPosts();
        })
        
        let mode = this.props.mode;
        if(mode == "news"){
            this.setState({
                endPoint: "news/search/all" 
            })
        }else if(mode == "bookmarks"){
            this.setState({
                endPoint: "user/personal-feed?isBookmark=true"
            },()=>this.loadPosts())
        }else{
            this.setState({
                endPoint: "user/personal-feed"
            })
        }
        
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadOnScroll);
    }

    loadOnScroll = (e) =>{
        if(this.state.total == 0) return;
        var el = document.getElementById('content-end');
        var rect = el.getBoundingClientRect();
        // var isAtEnd = (
        //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        //     rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        // );

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.loadPosts();
        }
    
        //User at the end of content. load more content
      
        // if(isAtEnd){
        //   this.loadPosts();
        // }
    }


    
componentWillReceiveProps(props){
   


    let mode = props.mode;

    this.setState({
        mode:mode
    })

    let isPostAdded = props.isPostAdded;
    if(isPostAdded){
        this.setState({
            isPostAdded:isPostAdded
        })
    }
   

    if(mode == "news"){
        this.setState({
            endPoint: "news/search/all" 
        })
    }else if(mode == "bookmarks"){
        this.setState({
            endPoint: "user/personal-feed?isBookmark=true"
        }) 
    }else{
        this.setState({
            endPoint: "user/personal-feed"
        })
    }

    if (JSON.stringify(this.state.localProps) != JSON.stringify(props)) {  // (props.pageLoadIndex && props.pageLoadIndex == 0) || /*  Liju: Conflict merge not removing commented */
        this.setState({
            uri:props.uri,
            type:props.type,
            localProps:props,
            
        },()=>{
            if(!Helper.isEmpty(props.payload)){
                this.setState({
                    companyUri:props.payload.companyUri,
                    search: props.payload.search,  
                    startDate: props.payload.startDate,
                    endDate: props.payload.endDate,
                    industryIds: props.payload.industryIds,
                    sectorIds: props.payload.sectorIds,
                    reqMode: props.payload.reqMode
                },()=>{
                    this.loadPosts();
                })
            }else{
                this.loadPosts();
            }
        });
    }
   
}

clearLoadedPosts = () => {
    this.setState({
        posts: [],
        meta: {
            acqOffset: null,
            compOffset: null,
            eventOffset: null,
            fieldOffset: null,
            newsOffset: null,
            oppOffset: null,
            peopleOffset: null,
            postOffset: null
        }
    });
    
}


loadPosts = () => {
  

    if (this.state.reqMode == "filter" || this.state.isPostAdded == true){
        this.clearLoadedPosts();
    }

    let state = this.state;
    let uri = state.uri;
    let type = state.type;

    let companyUri = state.companyUri;
    let search = state.search;
    let startDate = state.startDate;
    let endDate = state.endDate;
    let industryIds = state.industryIds;
    let sectorIds = state.sectorIds;
    

    let queryParam = {};

    if(!Helper.isEmpty(uri)){
            queryParam.uri = uri
    }
    if(!Helper.isEmpty(type)){
        queryParam.type = type
    }


    if(this.state.isFetching) return
    this.setState({isFetching:true}, function(){

        let payload = this.state.meta;
        let endPoint = this.state.endPoint;

        if(!Helper.isEmpty(companyUri)){
            payload.companyUri = companyUri
        }
        
        if(!Helper.isEmpty(search)){
            payload.search = search
        }
        

        if(!Helper.isEmpty(startDate)){
            payload.startDate = Helper.getDateInInputFormat(startDate);
        }

        if(!Helper.isEmpty(endDate)){
            payload.endDate = Helper.getDateInInputFormat(endDate);
        }

        if(!Helper.isEmpty(industryIds)){
            payload.industryIds = industryIds
        }

        if(!Helper.isEmpty(sectorIds)){
            payload.sectorIds = sectorIds
        }

        this.setState({
            loading:true
        })
        
        Axios.post(
            Helper.apiURL({
                uri:endPoint,
                query:queryParam
            }),payload
        )
        .then( (response) => {
            let result = [];
            let posts = [];

            let total = response.data.result.feeds.length;
            this.setState({
                loading:false
            });

            if (!Helper.isEmpty(response.data.result) && !Helper.isEmpty(response.data.result.feeds) ){
                result = response.data.result;
                posts  = result.feeds;                
            }

            this.setState({
                meta:response.data.result.meta,
                reqMode:"slider"
            });
            
            let preState = this.state;
                this.setState((preState) => {
                    return {
                        posts:[
                                ...preState.posts,
                                ...posts
                              ],
                        total:total,
                        isFetching:false
                        };
                    });
        })
        .catch((err) => {  
            this.setState({
                loading:false
          })
        });
    });
}

   render() {
    let posts = this.state.posts;
    let mode = this.props.mode;
    let loading = this.state.loading;
  
    return (
        <div>
            {this.state.isFetching?
                (Helper.loadMoreDiv())
            :
            ""
            }
    
        { (!Helper.isEmpty(posts) && (posts.length > 0))?
            <FeedCards data={posts} mode={mode}/>
            :
            (mode == "news" || mode == "bookmarks" ) && !this.state.isFetching ?
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">No Data Found</div>
                    </div>
                </div>
                :
                "" 
        }
        { /* Start load more content when this div is visible*/
         (this.state.total > 0)?
            <div id="content-end">
            {Helper.loadMoreDiv()}
            </div>: null
        }
        </div>
    )
  }
}


export default (withRouter(Feeds));