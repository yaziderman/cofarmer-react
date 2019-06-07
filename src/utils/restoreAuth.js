import store from '../store';
import config from '../shared/config';
import setAuthTokenHeader from './setAuthTokenHeader'; 
import { setToken, setUser, logoutUser } from '../actions/authAction';
import base64   from 'base-64';
import utf8  from 'utf8';

const restoreAuth = () =>{
    if (localStorage) {
          if(localStorage.auth){
            var  auth = localStorage.getItem("auth");            
            auth = base64.decode(auth);
            auth = utf8.decode(auth);
            auth = JSON.parse(auth);

            let expiry = auth.when ? (parseInt(auth.when) + parseInt(config.sessionTimeOut)) : 0;
            let now = Math.floor(Date.now() / 1000);
            let expired = now > expiry;
            auth.restored = true;
            if(auth.token && !expired){
              setAuthTokenHeader(auth.token);
              store.dispatch(setToken(auth.token));
              store.dispatch(setUser(auth.user));
            }else{
              logoutUser();
              localStorage.removeItem('auth');
            }
          }
      } else {
        //fallback to be added
      }
}
export default restoreAuth;