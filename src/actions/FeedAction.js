import config from '../shared/config';
import { DELETE_FEED_CARDS , REMOVED_BOOKMARKS }  from './types';
import Helper from "../shared/custom";



// export const deletedFeeds = (feedId) => dispatch => {
//     dispatch(removeDeletedFeed(feedId));
// }

export const deletedFeeds = (feedId) => dispatch => {
        dispatch(removeDeletedFeed(feedId));
}

export const deletedBookmarks = (feedId) => dispatch => {
    dispatch(removeDeletedBookmarks(feedId));
}




export const removeDeletedFeed = (feedId) =>{

    return {
        type : DELETE_FEED_CARDS,
        payload : feedId
    }
}

export const removeDeletedBookmarks = (feedId) =>{
    
    return {
        type : REMOVED_BOOKMARKS,
        payload : feedId
    }
}


