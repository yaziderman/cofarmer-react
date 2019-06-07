import Axios from 'axios';
import config from '../shared/config';
import { GET_ERRORS , REGISTER_NEW_USER ,REGISTER_AUTHENTICATED , SET_TOKEN}  from './types';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

export const register = (regData) => dispatch => {
    Axios.post(
        config.api("user/register"),
        regData)
    .then( (response) => {
            const token  = response.data.result.jwtToken; 
            setAuthTokenHeader(token);
            dispatch(setToken(token));
            dispatch(getUserData(response));    
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    });

}

export const registerAuthenticated = () => dispatch => {
    dispatch({
        type : REGISTER_AUTHENTICATED,
        payload : null
    });
}


export const getUserData = (data) =>{
    return {
        type : REGISTER_NEW_USER,
        payload : data
    }
   
}

export const setToken = (token) =>{
    return {
        type : SET_TOKEN,
        payload : token
    }
}