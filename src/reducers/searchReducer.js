
import { GET_SEARCH_DATA ,REMOVE_SEARCH_DATA, SAVE_SEARCH_CRITERIA, SAVE_ADVANCE_SEARCH_CRITERIA, SET_TAB_STATUS}  from '../actions/types';


const initialState = {
    search : null,
    tabStatus:"all",
    searchCriteria : {
        query:null
    }
}

export default function( state = initialState, action){
    switch(action.type){
        case  GET_SEARCH_DATA:
        return{
            ...state,
            searchResults:action.payload,
            searchCriteria:action.criteria,
            searchTime: new Date()
        }
        case SAVE_SEARCH_CRITERIA:
        return {
            ...state,
            searchCriteria:action.payload
        }

        case SAVE_ADVANCE_SEARCH_CRITERIA:
        return {
            ...state,
            advanceSearchCriteria:action.payload
        }

        case REMOVE_SEARCH_DATA:
        return{
            ...state,
            searchResults:action.payload,
            searchCriteria:{query:null},
            searchTime: new Date()
        }
        case SET_TAB_STATUS:
        return{
            ...state,
            tabStatus:action.payload,
        }
        default : 
        return state;
    }
}