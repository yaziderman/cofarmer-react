import Axios from 'axios';

const setAuthTokenHeader = auth =>{
    /*return true;*/
    console.log("token",auth);
    if(auth && auth.data && auth.data.api_token){
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+auth.data.api_token;
    }else{
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthTokenHeader;