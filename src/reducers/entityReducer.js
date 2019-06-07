import { SET_COMPANY_INFO }  from '../actions/types';

const initialState = {    
    company:{
        entityUri:null,
        entityType:"company",
        entityInfo:null,
    },
    person:{
        entityUri:null,
        entityType:"people",
        entityInfo:null
    },
    loading:true,
}

export default function( state = initialState, action){
    switch(action.type){
        case SET_COMPANY_INFO :
        
        var facets = action.facets;
        var currentCompany = state.company;
        var newCompany = action.payload;
        if(currentCompany.entityUri != action.entityUri){
            //new company, reset everything
            currentCompany.entityUri = action.entityUri;
            currentCompany.entityInfo = {};
        }
        
        facets = (facets+"").split(",");
        facets.forEach((facet) => {
            currentCompany.entityInfo[facet] = newCompany[facet];
        });
       
       
        state.company = currentCompany;
        state.loading = action.loading;

       
        return {
            ...state,
            company:currentCompany
        }

        default:
            return state;
    }
}