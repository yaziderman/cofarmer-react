import { REGISTER_NEW_USER ,REGISTER_AUTHENTICATED }  from '../actions/types';

const initialState = {
    userData : null,
    fromRegister:false,
    isRegistered:false
}

export default function( state = initialState, action){
    switch(action.type){
        case REGISTER_NEW_USER :
        return {
            ...state,
            isRegistered : true,
            fromRegister : true,
            userData : action.payload,
            loading:false
        }
        case REGISTER_AUTHENTICATED :
        return {
            ...state,
            isRegistered : false,
            fromRegister:true,
            userData : null
        }
        default:
        return state;
    }
}

