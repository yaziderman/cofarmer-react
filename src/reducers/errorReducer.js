import { GET_ERRORS }  from '../actions/types';

const initialState = {

}

export default function( state = initialState, action){
    switch(action.type){
        case GET_ERRORS: 
            return {
                error :action.payload,
                loading:false
            }
        default:
            return state;
    }
}