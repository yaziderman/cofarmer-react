
import Axios from 'axios';
import config from '../shared/config';
import { SET_COMPANY_INFO, GET_ERRORS }  from './types';
import Helper from "../shared/custom"

export const getCompanyInfo = (entityUri,facets,history) => dispatch => {
    Axios.get(
        Helper.apiURL({
            uri:"COMPANY/:entityUri",
            pathVar:{entityUri:entityUri},
            query:{facets:facets}
        })
    )
    .then( (response) => {
        const companyDetails  = response.data.result || {};     
        dispatch({
            type: SET_COMPANY_INFO,
            payload: companyDetails,
            facets:facets,
            loading:false,
            entityUri:entityUri
        })   
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });
}
