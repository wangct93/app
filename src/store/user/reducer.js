/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {

};

export let userData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    login(state,{data}){
        state.loadingLogin = true;
        setTimeout(() => {
            dispatch({
                type:'loginEnd',
                data:{
                    name:data.name || data.tel,
                    tel:data.tel
                }
            });
        },500);
        // $.ajax({
        //     url:'json/user.json',
        //     success(result){
        //         let info = result.filter(item => +item.tel === +data.tel && +item.yzm === +data.yzm)[0];
        //         dispatch({
        //             type:'loginEnd',
        //             data:info
        //         });
        //     }
        // });
    },
    loginEnd(state,{data}){
        state.loadingLogin = false;
        if(data){
            state.info = data;
            state.alertInfo = '登录成功';
            state.logined = true;
        }else{
            state.alertInfo = '登录失败';
        }
    },
    clearLoginAlertInfo(state,action){
        state.alertInfo = '';
    }
};
