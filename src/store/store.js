/**
 * Created by Administrator on 2018/3/7.
 */
import {createStore,combineReducers} from 'redux';

import * as router from './router/reducer';
import * as home from './home/reducer';
import * as city from './city/reducer';
import * as list from './list/reducer';
let fn = combineReducers(wt.extend({},router,home,city,list));
export let store = createStore((state,action) => {
    console.log('store接收操作：' + action.type);
    return fn(state,action);
});
window.store = store;
export default store;

export const dispatch = (action) =>{
    store.dispatch(action);
};