import { GET_BUSINESS_DATA }   from '../actions/types';

const initialState = {
    data:{},
}

export default function( state = initialState, action){
    switch(action.type){
        case GET_BUSINESS_DATA :
        return {
            ...state,
            data : action.payload,
        }
        default:
        return state;
    }
}