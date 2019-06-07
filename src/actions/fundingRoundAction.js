import { GET_FUNDING_ROUND_DATA  , GET_ERRORS } from './types';
import Axios from 'axios';
import config from '../shared/config';
import Helper from '../shared/custom';


export const fundingRound = (uri,type, callback) => dispatch => {
    Axios.get(
        Helper.apiURL({
            uri:"funding-round/:uri",
            pathVar:{"uri":uri},
            query:{
                "type":type
            }
        })
    )
    .then( (response) => {
        let frData = response.data.result || {};
        dispatch({
            type : GET_FUNDING_ROUND_DATA,
            payload : frData,
           
        }, () => {
          
        });
        if (callback)  callback();
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        })
    });
}
