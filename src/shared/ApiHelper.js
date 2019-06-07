import config from "./config"
import $ from "jquery"
import jQuery from "jquery"
import Helper from './custom'
import Axios from 'axios'
import store from '../store'

const jsonToQueryString = (obj) =>{
    if(typeof obj == 'String'){
        obj = JSON.parse(obj);
    }
    return $.param(obj);
}

const apiURL = (urlConfig) =>{
    var endpoint = urlConfig.uri || "";
    var pathVar = urlConfig.pathVar || {};
    var query = urlConfig.query || {};
    endpoint = endpoint.replace(/:(\w+)(\/|\b)/g, function(substring, match, nextMatch){
           return pathVar[match] + nextMatch;
    });     
    if(!jQuery.isEmptyObject(query)){
       var qString = jsonToQueryString(query);
       if(qString!=""){
           endpoint=endpoint+"?"+qString;
       }
   }    
    return config.api(endpoint);
}


const ApiHelper = {
    getCities : (countryId,callback) => { 
        Axios.get(
            Helper.apiURL({
                uri:"country/:countryId/city/list",
                pathVar:{countryId:countryId}
            })
        )
        .then( (response) => {
            let cities  = response.data.result || [];            
            if(callback){
                callback(cities);
            }
        })
        .catch((err) => {
            console.log("Error fetching cities");
        });

    },
    getMetaList : (callback) => { 
        Axios.get(
            Helper.apiURL({
                uri:"meta/list"
            })
        )
        .then((response) => {
            let metaList = response.data.result || {};
            if(callback){
                callback(metaList);
            }
        })
        .catch((err) => {
            console.log("Error fetching meta list");
        });

    },
    getOpportunityTypes : (callback) => {
        Axios.get(
            Helper.apiURL({
                uri:"opportunity/type",
                query:{includeSubTypes:true}
            })
        )
        .then( (response) => {
            let types  = response.data.result || [];
            if(callback){
                callback(types);
            }
        })
        .catch((err) => {
            console.log("Error fetching opportunity types");
        });
    },

    uploadFile: (params) =>{

        let file = params.file;
        let repoType = params.repoType;
        let fileType = params.fileType;
        let callback = params.callback;

        if(!Helper.isValidFileType(file.type,fileType)){
            Helper.pushError("Invalid file format, please try a different file.");
            return false;
          }
          //let thisComponent = this;

          let formData = new FormData();
          formData.append("file", file);
          
          var uploadUrl = Helper.apiURL({
                              uri:"ws/file/upload",
                              query:{repositoryType:repoType}
                          })
          Axios.post(uploadUrl, formData, {
              headers: {'Content-Type': 'multipart/form-data'}
          }).then(function (response) {            
            if(response.data.result){
              if(callback){
                  callback(response.data.result);
              }
            }else{
              Helper.pushError("Unable to upload the selected file");
            }
          })
          .catch(function () {
            Helper.pushError("Unable to upload the selected file");            
          });

    },

    fetchEntityStats: (params) =>{
        let type = params.type;
        let uri = params.uri;
        let callback = params.callback;
        
        Axios.get(
            Helper.apiURL({
                uri:"entity/info",
                query:{type:type,uri:uri}
            })
        )
        .then( (response) => {
            let info  = response.data.result || undefined;
            if(callback){
                callback(info);
            }
        })
        .catch((err) => {
            
        });
    }
}

export default ApiHelper;









