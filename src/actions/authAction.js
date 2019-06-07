
import Axios from 'axios';
import config from '../shared/config';
import { GET_ERRORS , SET_TOKEN, SET_USER, REMOVE_CURRENT_USER }  from './types';
import setAuthTokenHeader from '../utils/setAuthTokenHeader'; 
import Helper from "../shared/custom";

export const login = (loginData,history) => dispatch => {
    Axios.post(
        config.api("login"),
        loginData)
    .then( (response) => {
        const token  = response.data; 
        setAuthTokenHeader(token);
        dispatch(setToken(token));
        removeError()
    })
    .catch((err) => {
        Helper.pushTError("BAD_CREDENTIALS")
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    });
}

export const fetchUserInfo = () => dispatch => {
    // Axios.get(config.api("user/details"))
    // .then( (response) => {
    //     const userData  = response.data.result; 
    //     userData.image = userData.image || config.defaultUserImage;
    //     dispatch(setUser(userData));
    //     //if user profile is not complete redirect, should be commented out again after enabling backend changes on prod
    //     if(!userData.registrationCompleted && window.location.pathname !=  "/welcome"){
    //         window.location.href = "/register/sectors"
    //     }
    //     removeError();   
    // })
    // .catch((err) => {
    //     dispatch({
    //         type: GET_ERRORS,
    //         payload: err
    //     })
    // });
   
}

export const resetUserInfo = () => dispatch =>{
    dispatch(setUser({name:null,email:null}));
}

export const tokenAuthenticate = (token) => dispatch => {
    setAuthTokenHeader(token);
    dispatch(setToken(token));
}

export const setToken = (token) =>{
    return {
        type : SET_TOKEN,
        payload : token
    }
}

export const setUser = (userInfo) =>{
    
    return {
        type : SET_USER,
        payload : userInfo
    }
}


export const logoutUser = () => dispatch =>{
   localStorage.removeItem('auth');
   setAuthTokenHeader(null);
   dispatch(setToken(null));
   dispatch(removeCurrentUser());
}

export const removeCurrentUser = () =>{
    return {
        type : REMOVE_CURRENT_USER,
        payload : config.defaultUser
    }
}

export const removeError = () => dispatch =>{
    dispatch({
        type: GET_ERRORS,
        payload: null
    })
}