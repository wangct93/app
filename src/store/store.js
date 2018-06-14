/**
 * Created by Administrator on 2018/3/7.
 */
import {createStore,combineReducers} from 'redux';
import wt from 'wt-butil';
import * as router from './router/reducer';
import * as home from './home/reducer';
import * as city from './city/reducer';
import * as list from './list/reducer';
import * as input from './input/reducer';
import * as user from './user/reducer';
import * as order from './order/reducer';
import * as alert from './alert/reducer';
let fn = combineReducers(wt.extend({},router,home,city,list,input,user,order,alert));
export let store = createStore((state,action) => {
    console.log('store接收操作：' + action.type);
    return fn(state,action);
});
window.store = store;
export default store;

export const dispatch = (action) =>{
    store.dispatch(action);
};
