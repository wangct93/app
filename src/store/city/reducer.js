/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
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
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

let reducer = {
    selectCity(state,action){
        let {text: city, id: cityId} = action.data;
        wt.extend(state,{
            city,
            cityId
        });
        history.back();
    }
};
