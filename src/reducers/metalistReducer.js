import { GET_META_DATA , SET_SELECTED_SECTOR , SET_SELECTED_COMPANIES} from '../actions/types';

const initialState = {
    metaList : {},
    sectorData:null,
    companyData:null,
    interestAdded :false,
    companiesAdded:false
}


export default function( state = initialState, action){
    switch(action.type){
        case GET_META_DATA :
        return {
            ...state,
            metaList : action.payload,
        }

        case SET_SELECTED_SECTOR:
        return {
            ...state,
            sectorData:action.payload,
            interestAdded :true,
        }

        case SET_SELECTED_COMPANIES:
        return{
            ...state,
            companyData:action.payload,
            companiesAdded :true,
        }
        default:
        return state;
    }
}
