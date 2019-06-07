import { SET_TOKEN, UNSET_TOKEN, SET_USER }  from '../actions/types';
import { SET_CURRENT_USER , REMOVE_CURRENT_USER}  from '../actions/types';

const initialState = {
    
}

export default function( state = initialState, action){
   
    switch(action.type){
        case SET_TOKEN :
        var isAuthenticated = action.payload ?true:false;
        return {
            ...state,
            isAuthenticated : isAuthenticated,
            token : action.payload,
            loading:false
        }

        case UNSET_TOKEN :
        return {
            ...state,
            isAuthenticated : false,
            token : null
        }

        case SET_USER :
        return {
            ...state,
            user : action.payload
        }

        case REMOVE_CURRENT_USER :
        return{
            ...state,
            isAuthenticated:false,
            user:action.payload
        }
        default:
            return state;
    }
}