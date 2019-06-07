import React, { Component } from 'react'
import config from "../../shared/config";
import Helper from '../../shared/custom';
import PostHeader from '../post/PostHeader';
import PostAction from '../post/PostAction';
import PostFooter from '../post/PostFooter';
import PBArticle from '../post/PBArticle';
import PBUpdate from '../post/PBUpdate';


export default class Post extends Component {
    constructor(props){
        super(props);
        this.state ={
            post:props.postDetails
        }
    }
   render() {
    
    let post = this.state.post;

    //let profilePicUrl = (!Helper.isEmpty(post.profilePic))?Helper.dataPath(post.profilePic.publicUri):Helper.dataPath(config.defaultUserImage);
    let postPicUrl = (!Helper.isEmpty(post.images))?Helper.dataPath(post.images[0].publicUri):null;
    let postCreated = post.created;
    let poster = {name:post.name, profilePic:(!Helper.isEmpty(post.profilePic))?post.profilePic.publicUri:""};

    return (
        <div className="card" id="section2">
                <div className="card-body">
                    <PostHeader postCreated={postCreated} poster={poster}></PostHeader>
                    <div className="clearfix"></div>
                </div>
                <PBUpdate></PBUpdate>
                <PBArticle post={post}></PBArticle>

                <div className="card-body">
                    <PostAction></PostAction>
                    <hr/>
                    <PostFooter></PostFooter>
                </div>
        </div>
    )
  }
}