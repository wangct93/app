/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Home from '../../views/home';
import City from '../../views/city';
import List from '../../views/list';
let defaultState = {
    list:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/city',
            component:City
        },
        {
            path:'/list/:type',
            component:List
        }
    ]
};

export let routerData = (state = defaultState,action = {}) => {
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

let reducer = {

};
