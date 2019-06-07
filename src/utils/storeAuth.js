import store from '../store';
import base64   from 'base-64';
import utf8  from 'utf8';

const storeAuth = () =>{
    if (localStorage) {
        var storeState = store.getState();
        var auth = storeState.auth;
        auth.when = Math.floor(Date.now() / 1000);
        auth = JSON.stringify(auth);
        auth = utf8.encode(auth);
        auth = base64.encode(auth);
        localStorage.setItem('auth', auth);
    } else {
        //fallback to be added
    }
}
export default storeAuth;