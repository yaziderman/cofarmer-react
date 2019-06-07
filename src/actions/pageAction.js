import Axios from 'axios';
import { SET_PAGE_INFO , GET_ERRORS, SET_PAGE_REAL_INFO }  from './types';
import Helper from "../shared/custom"

export const getPageInfo = (type,uri,facets) => dispatch => {
    Axios.get(
        Helper.apiURL({
            uri:type+"/:uri",
            pathVar:{uri:uri},
            query:{facets:facets}
        })
    )
    .then( (response) => {
        const pageDetails  = response.data.result || {};     
        dispatch({
            type: SET_PAGE_INFO,
            payload: pageDetails,
            facets:facets,
            uri:uri,
            pageType:type,
            _isInterested:pageDetails._isInterested,
        })   
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });
}