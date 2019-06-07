import {GET_META_DATA ,GET_ERRORS ,SET_SELECTED_SECTOR , SET_SELECTED_COMPANIES} from './types';
import Axios from 'axios';
import Helper from "../shared/custom";
import config from '../shared/config';


export const getMetaData = () => dispatch => {

    Axios.get(
        Helper.apiURL({
            uri:"meta/list",
        })
    )
    .then( (response) => {
        let metaList = response.data.result || {};
        dispatch({
            type : GET_META_DATA,
            payload : metaList,
        });
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });
    
}
//user/interests/save

export const setSector = (selectedData) => dispatch => {
    /*Axios.post(
        config.api("user/interests"),
        selectedData)
    .then((response) => {
            dispatch({
                type: SET_SELECTED_SECTOR,
                payload: selectedData,
                interestadded:true,
            })
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });*/
    
}


export const followCompanies = (selectedData) => dispatch => {
    Axios.post(
        config.api("user/follow"),
        selectedData)
    .then((response) => {
            dispatch({
                type: SET_SELECTED_COMPANIES,
                payload: selectedData,
                companiesAdded: true,
            })
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
    
}





