import { SET_PAGE_INFO }  from '../actions/types';

const initialState = {    
    opportunity:{
        uri:null,
        details:{}
    },
    people:{
        uri:null,
        details:{}
    },    
    default:{
        uri:null,
        details:{}
    }  
}

export default function( state = initialState, action){
    switch(action.type){
        
        case SET_PAGE_INFO :
        
        var facets = action.facets;
        var pageType = (action.pageType+"").toLowerCase();
        var newUri = action.uri;
        let _isInterested = action._isInterested;

        var currentState = state;
        var currentPage = currentState[pageType] || currentState.default;
        var newPage = action.payload;
              
        if(currentPage.uri != newUri){           
            currentPage.uri = newUri;
            currentPage._isInterested = _isInterested;
            currentPage.details = {};
        }
        
        facets = (facets+"").split(",");
        facets.forEach((facet) => {
            currentPage.details[facet] = newPage[facet]
        });

        state.page[pageType] = currentPage;
        
        switch(pageType){
            case "opportunity":
                return {
                    ...state,
                    opportunity:currentPage
                }
            case "people":
                return {
                    ...state,
                    people:currentPage
                }
            case "people":
                return {
                    ...state,
                    default:currentPage
                }
        }
        

        default:
            return state;
    }
}