/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import userList from '@/json/user.json';
let defaultState = {
    info:{
        "id":1,
        "name":"admin",
        "pwd":"1234",
        "addr":"北一区30号",
        "imgSrc":"img/user/userImg.jpg"
    },
    viewData:[
        [
            {
                iconCls:'left',
                text:'收货地址',
                path:'addr'
            },
            {
                iconCls:'left',
                text:'我的收藏',
                path:'mySc'
            },
            {
                iconCls:'left',
                text:'我的客服',
                path:'myKf'
            }
        ]
    ]
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
            let info = userList.filter(item => item.name === data.name && item.pwd === data.pwd)[0];
            dispatch({
                type:'loginEnd',
                data:info
            });
        },500);
        // $.ajax({
        //     url:'json/user.json',
        //     success(result){
        //         let info = result.filter(item => item.name === data.name && item.pwd === data.pwd)[0];
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
        }else{
            state.alertInfo = '登录失败';
        }
    },
    clearLoginAlertInfo(state,action){
        state.alertInfo = '';
    }
};
