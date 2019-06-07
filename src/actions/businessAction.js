import { GET_BUSINESS_DATA  , GET_ERRORS } from './types';
import Axios from 'axios';
import config from '../shared/config';

export const getSectorData = () => dispatch =>{
    Axios.get(config.api("sectors"))
    .then( (response) => {

        const dataset  = response.data.result; 
        let business = {}
        var sectors = {};
        var industries = {};
        var sectorsArray = [];
        var industriesArray =[];

        dataset.forEach((item,index)=>{
            if(item.type == "INDUSTRY"){
                item.sector = {
                    id:item.parent.id,
                    name:item.parent.name
                }
                industries[item.id] = item;
                industriesArray.push(item);
            }else{
                sectors[item.id] = item;
                sectorsArray.push(item);
                /*item.industries.forEach((industry,index)=>{    
                    industry.sector = {
                        id:sector.id,
                        name:sector.name
                    }
                    industries[industry.id] = industry;
                    industriesArray.push(industry);
                });*/    
            }
        });
        
        business.sectors = sectors;
        business.industries = industries;
        business.sectorsArray = sectorsArray;
        business.industriesArray = industriesArray;

        dispatch({
            type: GET_BUSINESS_DATA,
            payload:business,
        })
               
    })
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });
}