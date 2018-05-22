/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    data:{},
    createId:1
};

export let orderData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    createOrder(state,action){
        let {userInfo,shopData,list:foodList} = action;
        let {data,createId} = state;
        let list = wt.getValue(data,userInfo.id,[]);
        let {name:shopName,id:shopId} = shopData;
        list.unshift({
            id:createId,
            shopName,
            shopId,
            list:foodList,
            time:new Date().toFormatString()
        });
        state.createId++;
        state.createSuccess = true;
    },
    submitComment(state,action){
        let {data} = action;
        let {orderId,userId} = data;
        let orderData = state.data[userId].filter(item => +item.id === +orderId)[0];
        orderData.comment = true;
    },
    initOrderState(state,action){
        state.createSuccess = false;
    }
};
