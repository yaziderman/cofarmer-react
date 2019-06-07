import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import config from './shared/config';

const middleware = [thunk];
const initialState = {
    auth:{
        isAuthenticated :false,
        token :null,
        user:config.defaultUser
    }
};

// dev tools middleware
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState, 
    composeSetup(applyMiddleware(...middleware))    
);
export default store;