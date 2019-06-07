import Axios from 'axios';
import Helper from "../shared/custom";

import { GET_SEARCH_DATA , REMOVE_SEARCH_DATA, SAVE_SEARCH_CRITERIA, SAVE_ADVANCE_SEARCH_CRITERIA, SET_TAB_STATUS, GET_ERRORS }  from './types';

export const globalSearch = (criteria,settings, callback) => dispatch =>{    
    dispatch({type:SAVE_SEARCH_CRITERIA,payload:criteria});
    Axios.get(
        Helper.apiURL({
            uri:"search",
            query:criteria
        })
    )
    .then( (response) => {
        let searchResults = response.data.result || {};
        dispatch({
            type : GET_SEARCH_DATA,
            payload : searchResults,
            criteria : criteria
        });
        if (callback != undefined)
            callback();
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });

   // dispatch(searchGlobal(searchData));
 }

 export const companiesBySectors = (criteria,settings) => dispatch =>{      
    dispatch({type:SAVE_SEARCH_CRITERIA,payload:criteria});
    Axios.get(
        Helper.apiURL({
            uri:"sector/companies/list",
            query:criteria
        })
    )
    .then( (response) => {
        let searchResults = response.data.result || {};
        dispatch({
            type : GET_SEARCH_DATA,
            payload : searchResults,
            criteria : criteria
        });
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });

   // dispatch(searchGlobal(searchData));
 }


 export const storeAdvanceSearch = (criteria, settings ) => dispatch => {        
    dispatch({ type:SAVE_ADVANCE_SEARCH_CRITERIA, payload:criteria });   
 }

 export const setTabStatus = (tabStatus) => dispatch =>{  
    dispatch({
        type : SET_TAB_STATUS,
        payload : tabStatus,
    });    

 }
 

 export const searchGlobal = (data) =>{
    return {
        type : GET_SEARCH_DATA,
        payload : data
    }
}

export const removeGlobalSearch = () => dispatch =>{
    dispatch(removeSearchGlobal());
 }
 

 export const removeSearchGlobal = () =>{
    return {
        type : REMOVE_SEARCH_DATA,
        payload : null
    }
}

 