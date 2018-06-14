/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
let defaultState = {

};

export let alertData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    alert(state,action){
        state.message = action.message;
    },
    clearAlertInfo(state,action){
        state.message = null;
    },
    loginEnd(state,action){
        let {data} = action;
        if(!data){
            state.message = '登录失败';
        }
    }
};
