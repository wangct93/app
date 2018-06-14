/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
let defaultState = {
    cityId:17,
    cityName:'杭州',
    hotList:[
        {
            id:1,
            text:'北京'
        },
        {
            id:18,
            text:'上海'
        },
        {
            id:17,
            text:'杭州'
        },
        {
            id:134,
            text:'广州'
        },
        {
            id:21,
            text:'苏州'
        },
        {
            id:16,
            text:'深圳'
        },
        {
            id:15,
            text:'南京'
        },
        {
            id:14,
            text:'天津'
        },
        {
            id:13,
            text:'重庆'
        },
        {
            id:12,
            text:'厦门'
        },
        {
            id:11,
            text:'武汉'
        },
        {
            id:111,
            text:'西安'
        }
    ]
};

export let cityData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    selectCity(state,action){
        let {text: city, id: cityId} = action.data;
        wt.extend(state,{
            cityName:city,
            cityId
        });
    }
};
