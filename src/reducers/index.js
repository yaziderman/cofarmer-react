import { combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import searchReducer from './searchReducer';
import entityReducer from './entityReducer';
import registerReducer from './registerReducer';
import metalistReducer from './metalistReducer';
import businessReducer from  './businessReducer';
import pageReducer from  './pageReducer';
import fundRoundReducer from './fundRoundReducer';
import feedReducer from './feedReducer';


export default combineReducers ({
    auth:authReducer,
    errors:errorReducer,
    search:searchReducer,
    entity:entityReducer,
    registerData:registerReducer,
    meta:metalistReducer,
    business:businessReducer,
    page:pageReducer,
    meta : metalistReducer,
    business : businessReducer,
    fundRound :fundRoundReducer,
    feedReducer:feedReducer,
})