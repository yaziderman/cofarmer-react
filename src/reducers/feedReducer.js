import { DELETE_FEED_CARDS , REMOVED_BOOKMARKS}  from '../actions/types';
const initialState = {
    deletedFeeds:null
}

export default function( state = initialState, action){
   
    switch(action.type){
        case DELETE_FEED_CARDS :
        return {
            ...state,
            deletedFeeds:action.payload,
        }
        case REMOVED_BOOKMARKS :
        return {
            ...state,
            removedBookmarks :action.payload
        }
        default:
            return state;
    }
}