import { GET_FUNDING_ROUND_DATA , GET_ERRORS }  from '../actions/types';

const initialState = {
    data : []
}

export default function( state = initialState, action){
    switch(action.type){
        case GET_FUNDING_ROUND_DATA: 
            return {
                ...state,
                data : action.payload
            }
        default:
            return state;
    }
}